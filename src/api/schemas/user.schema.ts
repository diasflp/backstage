import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: { type: String },
  passwordHash: { type: String },
  displayName: {
    type: String,
    required: true,
  },
  avatar: { type: String },
  create: { type: Date, default: Date.now },
});
