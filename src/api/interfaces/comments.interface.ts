import { Document } from 'mongoose';
import { User } from './user.interface';

export interface Comments extends Document {
  readonly comment: string;
  readonly user: User;
  readonly publish: boolean;
  readonly created: Date;
  readonly updateat: Date;
}
