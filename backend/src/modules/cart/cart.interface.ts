import mongoose, { Document } from 'mongoose';

export interface Cart extends Document {
  goods: [
    {
      count: number;
      good_id: mongoose.Schema.Types.ObjectId;
    },
  ];
  user_id: mongoose.Schema.Types.ObjectId;
}
