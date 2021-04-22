import type { DIDDocument } from 'did-resolver';
import type { Repository } from '../types';
import { createDidDocument } from './createDidDocument';
import { addressToDid, createKeyPair } from './createKeyPair';

export const createDidRepository: (
  mockDb: Record<string, DIDDocument>
) => Repository<DIDDocument> = (mockDb) => {
  return {
    create: async () => {
      const { address, privateKey, publicKey } = createKeyPair();
      const did = addressToDid(address);
      const didDocument = await createDidDocument({ id: did, controllerKey: publicKey });
      mockDb[did] = didDocument;
      console.log(didDocument);
      return didDocument;
    },
    getById: async (id) => {
      return mockDb[id];
    },
  };
};
