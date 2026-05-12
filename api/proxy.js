const Anthropic = require('@anthropic-ai/sdk');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
    }

  const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
          return res.status(500).json({ error: 'ANTHROPIC_API_KEY not configured' });
    }

  const anthropic = new Anthropic({ apiKey });

  try {
        const { model, max_tokens, messages, system } = req.body;
        const response = await anthropic.messages.create({
                model,
                max_tokens,
                messages,
                system,
        });
        return res.status(200).json(response);
  } catch (error) {
        console.error('Anthropic API Error:', error);
        return res.status(error.status || 500).json({ error: error.message });
  }
}
