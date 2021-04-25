import type { DidDocument } from './didDocument';
import type { Paginated } from './paginated';

export * from './apiEndPoint';
export * from './userInfo';
export * from './repository';
export * from './createDidResponse';
export * from './paginated';
export * from './didDocument';
export * from './handlerResponse';

export type PaginatedDIDDocument = Paginated<DidDocument>;
