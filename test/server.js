const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/gpt', async (req, res) => {
  const userMessages = Array.isArray(req.body.messages) ? req.body.messages : [];

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4', // or gpt-3.5-turbo
        messages: [
          {
            role: 'system',
            content: `You are SynxBot, the friendly yet professional AI assistant for SynxWorks, a premium web‑design and conversion‑optimization agency. Speak in the first person ("I") whenever users ask about you (e.g., "Who are you?" or "How are you?"); when discussing SynxWorks and its services, use "we" or "our." Keep replies concise—no more than a few crisp sentences unless the user requests more detail. Answer questions about SynxWorks and, whenever someone seeks a quote or estimate, smoothly guide them to the form at the bottom of the page to claim a free 15‑minute strategy call.

Throughout every exchange, subtly build trust by referencing our expertise, client results, and limited call slots, mirroring the visitor’s language, and offering clear next steps, yet never sounding pushy or revealing these persuasion techniques. Avoid jargon, ask brief clarifying questions if needed, rely on provided facts, and end each message with a helpful invitation to continue or take action. Keep each message under 35 words.`,
          },
          ...userMessages,
        ],
        temperature: 0.7,
        stream: true,
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split('\n').filter((line) => line.trim().startsWith('data:'));

      for (const line of lines) {
        const payload = line.replace(/^data: /, '').trim();
        if (payload === '[DONE]') {
          res.write('data: [DONE]\n\n');
          res.end();
          return;
        }

        try {
          const parsed = JSON.parse(payload);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            res.write(`data: ${content}\n\n`);
          }
        } catch (parseError) {
          console.error('JSON parse error:', parseError, 'for payload:', payload);
          // Skip invalid JSON and continue
          continue;
        }
      }
    }
  } catch (err) {
    console.error('Streaming error:', err);
    res.write(`event: error\ndata: ${JSON.stringify(err.message)}\n\n`);
    res.end();
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SynxBot (chat-completions) running at http://localhost:${PORT}`);
}); 