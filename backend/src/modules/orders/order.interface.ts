import mongoose, { Document } from 'mongoose';

export enum OrderStatus {
  NEW = 'new',
  APPROVED = 'approved',
  READY = 'ready',
  DELIVERED = 'delivered',
}

export interface Order extends Document {
  goods: [
    {
      count: number;
      good_id: mongoose.Schema.Types.ObjectId;
    },
  ];
  user_id: mongoose.Schema.Types.ObjectId;
  address_id: mongoose.Schema.Types.ObjectId;
  status: OrderStatus;
}
