import { Router } from 'express';
import Status from 'http-status';

export const createApplicationRoute = () => {
  const router = Router();

  router.get('/:id', (req, res) => {
    res.status(Status.OK).send({ data: 'app' });
  });

  router.get('/', (req, res) => {
    res.status(Status.OK).send({ data: 'apps' });
  });

  router.post('/', (req, res) => {
    res.status(Status.OK).send({ result: 'ok' });
  });

  return router;
};
