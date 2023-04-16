import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema({
  id: Number,
  title: String,
  city: String,
  street: String,
  building: String,
  apartment: String,
  index: Number,
});
