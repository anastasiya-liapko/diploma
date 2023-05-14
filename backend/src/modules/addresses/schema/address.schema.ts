import * as mongoose from 'mongoose';

export const AddressSchema = new mongoose.Schema(
  {
    city: String,
    street: String,
    building: String,
    apartment: String,
    index: Number,
  },
  {
    versionKey: false,
  },
);
