import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  imageLink: String,
  siteLink: String,
});
