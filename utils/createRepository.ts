// import type { DIDDocument } from 'did-resolver';
// import { createDidDocument } from './createDidDocument';
// import { addressToDid, createKeyPair } from './createKeyPair';
import { Repository as OrmRepository, AbstractRepository, getCustomRepository } from 'typeorm';
import { DidDocument, Repository } from '../types';

// export const createRepository: <TItem extends DidDocument>(option: {
//   mockDatabase: Record<string, unknown>;
// }) => Repository<TItem> = ({ mockDatabase }) => {
//   return {
//     create: async (id, item) => {
//       return null;
//     },
//   };
// };
