import * as mongoose from 'mongoose';

export const CartSchema = new mongoose.Schema({
  goods: [
    {
      _id: false,
      count: Number,
      good_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Good',
      },
    },
  ],
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
