import type { DIDDocument } from 'did-resolver';

export type CreateDidResponse = {
  did: string;
  status: 'OK' | 'ERROR';
  created: number;
  initialDidDocument: DIDDocument;
  privateKey: string;
};
