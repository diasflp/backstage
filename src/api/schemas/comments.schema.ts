import * as mongoose from 'mongoose';

export const CommentsSchema = new mongoose.Schema({
  comment: {
    type: String,
    unique: true,
  },
  publish: {
    type: Boolean,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  create: { type: Date, default: Date.now },
  updateat: { type: Date, default: Date.now },
});

CommentsSchema.pre('update', function(next) {
  const modifiedField = this.getUpdate().$set.field;
  if (!modifiedField) {
    return next();
  }
  const now = new Date();
  this.updatedat = now;
  next();
});
