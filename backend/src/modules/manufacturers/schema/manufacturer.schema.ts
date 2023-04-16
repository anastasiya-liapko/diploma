import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: {
    type: String,
    default: '',
  },
  imageLink: {
    type: String,
    default: '',
  },
  siteLink: {
    type: String,
    default: '',
  },
});
