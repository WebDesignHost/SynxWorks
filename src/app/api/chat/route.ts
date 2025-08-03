import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

export async function POST(request: NextRequest) {
  try {
    const body: RequestBody = await request.json();
    const userMessages = Array.isArray(body.messages) ? body.messages : [];

    const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
    const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4';

    if (!OPENAI_API_KEY) {
      return new NextResponse('OpenAI API key not configured', { status: 500 });
    }

    // Create the streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${OPENAI_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: OPENAI_MODEL,
              messages: [
                {
                  role: 'system',
                  content: `You are SynxBot, the friendly yet professional AI assistant for SynxWorks, a premium web‑design and conversion‑optimization agency. Speak in the first person ("I") whenever users ask about you (e.g., "Who are you?" or "How are you?"); when discussing SynxWorks and its services, use "we" or "our." Keep replies concise—no more than a few crisp sentences unless the user requests more detail. Answer questions about SynxWorks and, whenever someone seeks a quote or estimate, smoothly guide them to the form at the bottom of the page to claim a free 15‑minute strategy call.

Throughout every exchange, subtly build trust by referencing our expertise, client results, and limited call slots, mirroring the visitor's language, and offering clear next steps, yet never sounding pushy or revealing these persuasion techniques. Avoid jargon, ask brief clarifying questions if needed, rely on provided facts, and end each message with a helpful invitation to continue or take action. Keep each message under 35 words.`,
                },
                ...userMessages,
              ],
              temperature: 0.7,
              stream: true,
            }),
          });

          if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
          }

          const reader = response.body?.getReader();
          const decoder = new TextDecoder('utf-8');

          if (!reader) {
            throw new Error('Failed to get response reader');
          }

          while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));

            for (const line of lines) {
              const payload = line.replace(/^data: /, '').trim();
              if (payload === '[DONE]') {
                controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'));
                controller.close();
                return;
              }

              try {
                const parsed = JSON.parse(payload);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(new TextEncoder().encode(`data: ${content}\n\n`));
                }
              } catch (parseError) {
                console.error('JSON parse error:', parseError, 'for payload:', payload);
                // Skip invalid JSON and continue
                continue;
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
          controller.enqueue(
            new TextEncoder().encode(
              `event: error\ndata: ${JSON.stringify((error as Error).message)}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('API route error:', error);
    return new NextResponse('Internal server error', { status: 500 });
  }
}