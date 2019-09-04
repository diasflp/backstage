import * as mongose from 'mongoose';

export const AboutSchema = new mongose.Schema({
  description: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  skill: [],
  create: { type: Date, default: Date.now },
});
