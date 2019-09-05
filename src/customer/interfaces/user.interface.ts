import { Document } from 'mongoose';

export interface User extends Document {
  readonly name: string;
  readonly email: string;
  readonly displayName: string;
  readonly avatar: string;
  readonly created: Date;
}
