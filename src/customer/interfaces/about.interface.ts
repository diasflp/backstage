import { Document } from 'mongoose';

export interface About extends Document {
  readonly description: string;
  readonly skill: Skillinterface[];
  readonly created: Date;
}

export interface Skillinterface {
  description: string;
}
