import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  title: String,
});
