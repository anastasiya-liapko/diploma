import * as mongoose from 'mongoose';

export const CategorySchema = new mongoose.Schema({
  id: Number,
  title: String,
});
