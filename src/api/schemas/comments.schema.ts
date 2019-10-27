import * as mongoose from 'mongoose';

export const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  publish: {
    type: Boolean,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  create: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});
