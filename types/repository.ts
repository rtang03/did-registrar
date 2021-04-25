import type { DIDDocument } from 'did-resolver';
import { Account, User } from '../models';
import type { DidDocument } from './didDocument';
import type { HandlerResponse } from './handlerResponse';
import type { Paginated } from './paginated';

export type Repository<TItem extends DidDocument | User | Account> = {
  create: (option: any) => Promise<TItem>;
  getById: (id: string) => Promise<HandlerResponse<TItem>>;
  getAll: () => Promise<HandlerResponse<Paginated<TItem>>>;
};

export type DidRepository = Repository<DIDDocument>;

export type TRepository = 'User' | 'DidDocument' | 'Account';
