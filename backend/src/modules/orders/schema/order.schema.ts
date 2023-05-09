import * as mongoose from 'mongoose';
import { EDeliveryType, EOrderStatus } from '../order.interface';

export const OrderSchema = new mongoose.Schema(
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
    total_price: Number,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
    },
    delivery_type: {
      type: String,
      default: EDeliveryType.PICKUP,
    },
    status: {
      type: String,
      default: EOrderStatus.NEW,
    },
  },
  {
    versionKey: false,
  },
);
