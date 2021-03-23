import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { NextApiRequest, NextApiResponse } from 'next';

const shows = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { accessToken } = await getAccessToken(req, res, {
      scopes: ['read:shows'],
    });
    const apiPort = process.env.API_PORT || 3000;
    const response = await fetch(`http://localhost:${apiPort}/api/shows`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const shows = await response.json();
    res.status(200).json(shows);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export default withApiAuthRequired(shows);
