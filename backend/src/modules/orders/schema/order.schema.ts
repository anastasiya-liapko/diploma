import * as mongoose from 'mongoose';
import { EOrderStatus } from '../order.interface';

export const OrderSchema = new mongoose.Schema({
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
  status: {
    type: String,
    default: EOrderStatus.NEW,
  },
});
