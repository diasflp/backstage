import * as mongoose from 'mongoose';

export const AboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    dropDups: true,
    unique: true,
  },
  skill: [],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  create: { type: Date, default: Date.now },
  updateat: { type: Date, default: Date.now },
});

AboutSchema.pre('update', function(next) {
  const modifiedField = this.getUpdate().$set.field;
  if (!modifiedField) {
    return next();
  }
  const now = new Date();
  this.updatedat = now;
  next();
});
