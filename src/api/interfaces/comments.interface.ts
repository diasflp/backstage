import { Document } from 'mongoose';
import { User } from './user.interface';

export interface Comments extends Document {
  readonly comment: string;
  readonly user: User;
  readonly like: LikeInterface[];
  readonly publish: boolean;
  readonly created: Date;
  readonly updateat: Date;
}

export interface LikeInterface {
  readonly user: User;
}
