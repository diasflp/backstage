import { Document } from 'mongoose';
import { User } from './user.interface';

export interface About extends Document {
  readonly description: string;
  readonly skill: Skillinterface[];
  readonly created: Date;
  readonly user: User;
}

export interface Skillinterface {
  description: string;
}
