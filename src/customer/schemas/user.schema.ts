import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  displayName: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  avatar: { type: String },
  create: { type: Date, default: Date.now },
});
