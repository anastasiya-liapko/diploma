import * as mongoose from 'mongoose';

export const StoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: '',
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
      },
    ],
  },
  {
    versionKey: false,
  },
);
