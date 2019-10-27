import { Document } from 'mongoose';

export interface User extends Document {
  passwordHash: string;
  password: string;
  readonly name: string;
  readonly email: string;
  readonly displayName: string;
  readonly avatar: string;
  readonly profile: string;
  readonly created: Date;
  readonly updateat: Date;
  readonly like: LikeInterface[];
}

export interface LikeInterface {
  id: number;
}
