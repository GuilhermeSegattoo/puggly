import { NextApiRequest, NextApiResponse } from 'next'
import { PluggyClient } from 'pluggy-sdk'

// pages/api/token.js


const pluggyClient = new PluggyClient({
  clientId: process.env.PLUGGY_CLIENT_ID,
  clientSecret: process.env.PLUGGY_CLIENT_SECRET,
});


export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { itemId } = req.body;
      const tokenResponse = itemId
        ? await pluggyClient.createConnectToken(itemId)
        : await pluggyClient.createConnectToken();

      res.status(200).json({ accessToken: tokenResponse.accessToken });
    } catch (error) {
      console.error('Error generating token:', error);
      res.status(500).json({ error: 'Falha no token' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
