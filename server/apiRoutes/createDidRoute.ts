import { Router } from 'express';
import Status from 'http-status';
import type { DidRepository } from '../../types';
import { createRestRoute } from '../../utils';

export const createDidRoute: (repo: DidRepository) => Router = (repo) =>
  createRestRoute({
    GET_ALL: async (req, res) => {
      const data = await repo.getById(req.query.id as string);
      res.status(Status.OK).send({ status: 'OK', data });
    },
    GET: async (req, res) => {
      const data = await repo.getAll();
      res.status(Status.OK).send({ status: 'OK', data });
    },
    POST: async (req, res) => {
      const response = await repo.create(null);
      res.status(Status.CREATED).send(response);
    },
  });
