import { Request, Response, Router } from 'express';
import Status from 'http-status';

type Action = {
  GET_ALL: (req: Request, res: Response) => Promise<void>;
  GET: (req: Request, res: Response) => Promise<void>;
  POST: (req: Request, res: Response) => Promise<void>;
};

export const createRestRoute = ({ GET, GET_ALL, POST }: Action) => {
  const router = Router();

  const catchHandlerErrors = (fn: (req: Request, res: Response) => Promise<void>) => async (
    req: Request,
    res: Response
  ) => {
    try {
      await fn(req, res);
    } catch (e) {
      console.error(e);
      res.status(Status.BAD_REQUEST).send({ status: 'ERROR', message: 'something bad happens' });
    }
  };

  router.get(
    '/:id',
    catchHandlerErrors(async (req, res) => GET_ALL(req, res))
  );

  router.get(
    '/',
    catchHandlerErrors(async (req, res) => GET(req, res))
  );

  router.post(
    '/',
    catchHandlerErrors(async (req, res) => POST(req, res))
  );

  router.all('/', (req, res) => {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE', 'POST']);
    res.status(Status.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
  });

  return router;
};

