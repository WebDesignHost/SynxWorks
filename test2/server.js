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
            content: `You are SynxBot, a friendly and professional AI assistant for SynxWorks, a web design and development agency. 

Your role is to help potential clients understand how SynxWorks can help their business grow through effective website design and development.

Key information about SynxWorks:
- We create high-converting websites that turn visitors into paying customers
- Our websites typically cost $3,000-$8,000 depending on complexity
- We deliver websites in 2-4 weeks
- We focus on business results, not just pretty designs
- Our clients see an average 247% increase in lead generation
- We offer a free 30-minute strategy call to discuss client needs

Be helpful, professional, and focus on how we can help their business grow. If they ask about pricing, process, or want to get started, guide them toward booking a strategy call.`,
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
        const payload = line.replace(/^data: /, '');
        if (payload === '[DONE]') {
          res.write('data: [DONE]\n\n');
          res.end();
          return;
        }

        const parsed = JSON.parse(payload);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) {
          res.write(`data: ${content}\n\n`);
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