import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema(
  {
    goods: [
      {
        _id: false,
        count: Number,
        good: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Good',
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    total_price: Number,
  },
  {
    versionKey: false,
  },
);
