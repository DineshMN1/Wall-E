// pages/api/rovers/[roverId]/[type].ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roverId, type } = req.query;
  try {
    const response = await fetch(`http://localhost:5050/rovers/${roverId}/${type}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data from Python API' });
  }
}
