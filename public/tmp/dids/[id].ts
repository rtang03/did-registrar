import type { NextApiRequest, NextApiResponse } from 'next';
import type { ApiEndPoint } from '../../../types';

const createRestMethod = (apiEndpoint: ApiEndPoint) => (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    method,
    query: { id },
  } = req as any;

  return (
    {
      ['GET' as string]: async () => {
        const result = await apiEndpoint.getById(id);
        res.status(200).json(result);
      },
      PUT: async () => {
        const result = await apiEndpoint.deleteById(id);
        res.status(200).json(result);
      },
    }[method] ||
    (() => {
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
    })
  );
};

const didApiEndPoint: ApiEndPoint = {
  getById: async () => null,
  deleteById: async () => null,
};

export default createRestMethod(didApiEndPoint);
