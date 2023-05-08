import mongoose, { Document } from 'mongoose';

export interface Cart extends Document {
  goods: [
    {
      count: number;
      good: mongoose.Schema.Types.ObjectId;
    },
  ];
  user: mongoose.Schema.Types.ObjectId;
  total_price: number;
}
