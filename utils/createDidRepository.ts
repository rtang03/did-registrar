import type { DidDocument, Repository } from '../types';
import { createDidDocument } from './createDidDocument';

export const createDidRepository: (
  mockDb: Record<string, DidDocument>
) => Repository<DidDocument> = (mockDb) => {
  return {
    create: async ({ id, publicKey, description }) => {
      const didDocument = await createDidDocument({
        id,
        controllerKey: publicKey,
        description,
      });
      mockDb[id] = didDocument;
      return didDocument;
    },
    getById: async (id) => {
      return { status: 'OK', data: { id: '123', description: 'hello' } };
    },
    getAll: async () => {
      return {
        status: 'OK',
        data: {
          total: 1,
          items: [{ id: '123', description: 'hello' }],
          hasMore: false,
          cursor: 1,
        },
      };
    },
  };
};
