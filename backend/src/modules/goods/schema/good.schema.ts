import * as mongoose from 'mongoose';

export const GoodSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  imageLink: String,
  price: Number,
  size: String,
  weight: Number,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manufacturer',
  },
});
