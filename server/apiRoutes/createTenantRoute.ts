import { Router } from 'express';
import Status from 'http-status';

export const createTenantRoute = () => {
  const router = Router();

  router.get('/:id', (req, res) => {
    res.status(Status.OK).send({ data: 'tenant' });
  });

  router.get('/', (req, res) => {
    res.status(Status.OK).send({ data: 'tenants' });
  });

  router.post('/', (req, res) => {
    res.status(Status.OK).send({ result: 'ok' });
  });

  return router;
};
