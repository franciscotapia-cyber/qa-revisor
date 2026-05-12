// Vercel Serverless Function - Proxy seguro a Anthropic API
export default async function handler(req, res) {
      if (req.method === 'OPTIONS') {
              res.setHeader('Access-Control-Allow-Origin', '*');
              res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
              res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
              return res.status(200).end();
      }
      if (req.method !== 'POST') {
              return res.status(405).json({ error: { message: 'Method not allowed' } });
      }
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
              return res.status(500).json({ error: { message: 'ANTHROPIC_API_KEY no configurada' } });
      }
      try {
              const body = req.body;
              if (!body.messages || !Array.isArray(body.messages)) {
                        return res.status(400).json({ error: { message: 'messages es requerido' } });
              }
              const maxTokens = Math.min(body.max_tokens || 1000, 4096);
              const anthropicBody = { model: body.model || 'claude-sonnet-4-20250514', max_tokens: maxTokens, messages: body.messages };
              if (body.system) { anthropicBody.system = body.system; }
              const response = await fetch('https://api.anthropic.com/v1/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01' },
                        body: JSON.stringify(anthropicBody)
              });
              const data = await response.json();
              res.setHeader('Access-Control-Allow-Origin', '*');
              if (!response.ok) { return res.status(response.status).json(data); }
              return res.status(200).json(data);
      } catch (error) {
              res.setHeader('Access-Control-Allow-Origin', '*');
              return res.status(500).json({ error: { message: 'Proxy error: ' + (error.message || 'Unknown') } });
      }
}
