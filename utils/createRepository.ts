// import type { DIDDocument } from 'did-resolver';
// import { createDidDocument } from './createDidDocument';
// import { addressToDid, createKeyPair } from './createKeyPair';
import { Repository as OrmRepository } from 'typeorm';

type Repository<TItem> = {
  create: (id: string, item: TItem) => Promise<any>;
};

export const createRepository: <TItem>(option: { mockDb: any }) => Repository<TItem> = ({
  mockDb,
}) => {
  return {
    create: async (id, item) => {
      return null;
    },
  };
};
