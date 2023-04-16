import * as mongoose from 'mongoose';

export const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
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
  address_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  status: String,
});
