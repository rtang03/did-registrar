import type { DIDDocument } from 'did-resolver';

export type Repository<TItem> = {
  create: (option: any) => Promise<TItem>;
  getById: (id: string) => Promise<TItem>;
};

export type DidRepository = Repository<DIDDocument>;
