import express, { Router } from 'express';

export const createDidRoute = () => {
  const router = Router();

  router.get('/:id', (req, res) => {
    res.status(200).send({});
  });

  return router;
};
