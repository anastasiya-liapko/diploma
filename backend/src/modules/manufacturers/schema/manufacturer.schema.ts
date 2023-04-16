import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: Number,
  title: String,
  description: String,
  imageLink: String,
  siteLink: String,
});
