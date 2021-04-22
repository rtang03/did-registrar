import { Router } from 'express';
import Status from 'http-status';
import type { DidRepository } from '../../types';

export const createDidRoute = (repo: DidRepository) => {
  const router = Router();

  router.use((req, res) => {
    const {
      query: { id },
    } = req;

    ({
      ['GET' as string]: () => {
        res.status(Status.OK).send({ data: 'okok' });
      },
    }[req.method]());
  });

  // router.get('/:id', (req, res) => {
  //   res.status(Status.OK).send({ data: 'did' });
  // });
  //
  // router.get('/', (req, res) => {
  //   res.status(Status.OK).send({ data: 'dids' });
  // });
  //
  // router.post('/', async (req, res) => {
  //   try {
  //     const response = await repo.create(null);
  //     res.status(Status.CREATED).send(response);
  //   } catch (e) {
  //     console.error(e);
  //     res.status(Status.BAD_REQUEST).send({ error: 'fail to create did' });
  //   }
  // });

  return router;
};
