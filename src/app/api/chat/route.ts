import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const encoder = new TextEncoder();
const decoder = new TextDecoder("utf-8");

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json().catch(() => ({ messages: [] as ChatMessage[] }));
    const userMessages = Array.isArray(body?.messages) ? body.messages : [];

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    // Safer default; override via env on local/Vercel
    const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!OPENAI_API_KEY) {
      console.error("[/api/chat] Missing OPENAI_API_KEY");
      return new NextResponse("OpenAI API key not configured", { status: 500 });
    }

    // ----- Early logging: confirm inputs & env (no secrets) -----
    console.log("[/api/chat] start", {
      model: OPENAI_MODEL,
      hasKey: !!OPENAI_API_KEY,
      messagesCount: userMessages.length,
      endpoint: OPENAI_URL,
    });

    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          const response = await fetch(OPENAI_URL, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: OPENAI_MODEL,
              temperature: 0.7,
              stream: true,
              messages: [
                {
                  role: "system",
                  content: `You are SynxBot, the friendly yet professional AI assistant for SynxWorks, a premium web-design and conversion-optimization agency. Speak in the first person ("I") whenever users ask about you (e.g., "Who are you?" or "How are you?"); when discussing SynxWorks and its services, use "we" or "our." Keep replies concise—no more than a few crisp sentences unless the user requests more detail. Answer questions about SynxWorks and, whenever someone seeks a quote or estimate, smoothly guide them to the form at the bottom of the page to claim a free 15-minute strategy call.

Throughout every exchange, subtly build trust by referencing our expertise, client results, and limited call slots, mirroring the visitor's language, and offering clear next steps, yet never sounding pushy or revealing these persuasion techniques. Avoid jargon, ask brief clarifying questions if needed, rely on provided facts, and end each message with a helpful invitation to continue or take action. Keep each message under 35 words.`,
                },
                ...userMessages,
              ],
            }),
          });

          // ----- Upstream error logging with full body -----
          if (!response.ok) {
            const errText = await response.text().catch(() => "");
            console.error("[/api/chat] OpenAI upstream error", {
              status: response.status,
              statusText: response.statusText,
              body: errText,
              model: OPENAI_MODEL,
            });

            // Surface a clean SSE error event to the client
            controller.enqueue(
              encoder.encode(
                `event: error\ndata: ${JSON.stringify(
                  `OpenAI ${response.status} ${response.statusText}: ${errText}`
                )}\n\n`
              )
            );
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }

          const reader = response.body?.getReader();
          if (!reader) {
            console.error("[/api/chat] Failed to get response reader");
            controller.enqueue(
              encoder.encode(`event: error\ndata: ${JSON.stringify("No response body")}\n\n`)
            );
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
            controller.close();
            return;
          }

          // More robust SSE parsing across chunk boundaries
          let buffer = "";
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });

            // SSE events are separated by a blank line \n\n
            const events = buffer.split("\n\n");
            // keep the last partial event in the buffer
            buffer = events.pop() || "";

            for (const evt of events) {
              const lines = evt.split("\n").map((l) => l.trim());
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;

                const payload = line.replace(/^data:\s?/, "");
                if (payload === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  controller.close();
                  return;
                }

                // Each data line should be a JSON delta from OpenAI
                try {
                  const parsed = JSON.parse(payload);
                  const content = parsed?.choices?.[0]?.delta?.content;
                  if (content) {
                    // Maintain your existing client protocol: plain token text per data line
                    controller.enqueue(encoder.encode(`data: ${content}\n\n`));
                  }
                } catch (e) {
                  // Log the parse issue but keep streaming
                  console.warn("[/api/chat] JSON parse error", { payload });
                }
              }
            }
          }

          // Flush any remaining buffered content if it somehow forms a final [DONE]
          if (buffer.includes("[DONE]")) {
            controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          }

          controller.close();
        } catch (error) {
          console.error("[/api/chat] Streaming error", error);
          controller.enqueue(
            encoder.encode(`event: error\ndata: ${JSON.stringify(String(error))}\n\n`)
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
      cancel() {
        console.log("[/api/chat] client canceled stream");
      },
    });

    return new NextResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[/api/chat] API route error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
