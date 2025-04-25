
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método não permitido' });
    return;
  }

  try {
    // Get raw request body
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const buffer = Buffer.concat(chunks);
    const rawBody = buffer.toString('utf8');

    // Log the callback data
    const logEntry = `${new Date().toISOString()} - Dados recebidos:\n${rawBody}\n\n`;
    
    // In production on Vercel, you should use a proper logging service instead of file writes
    // This is just for demonstration - file writes won't persist on Vercel's serverless functions
    const logPath = path.join(process.cwd(), 'gpo_callback_log.txt');
    
    // For Vercel, use a logging service instead of local file writes
    console.log('GPO Callback received:', logEntry);
    
    // Attempt to write to file (won't work in production on Vercel)
    try {
      fs.appendFileSync(logPath, logEntry);
    } catch (writeError) {
      console.error('Error writing to log file:', writeError);
      // In production, you'd send this to a logging service or database
    }

    // Send OK response as required by the payment gateway
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error processing callback:', error);
    res.status(500).json({ error: 'Erro ao processar callback' });
  }
}
