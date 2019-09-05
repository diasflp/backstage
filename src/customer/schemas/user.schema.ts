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
  photo: { type: String, unique: true },
  create: { type: Date, default: Date.now },
});
