import type { DIDDocument } from 'did-resolver';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class DidDocument implements DIDDocument {
  @PrimaryColumn()
  id!: string;

  description?: string;
}
