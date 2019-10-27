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
  profile: {
    type: String,
    required: true,
  },
  password: { type: String },
  passwordHash: { type: String },
  displayName: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comments',
    },
  ],
  avatar: { type: String },
  create: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});
