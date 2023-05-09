import mongoose, { Document } from 'mongoose';

export enum EOrderStatus {
  NEW = 'new',
  APPROVED = 'approved',
  READY = 'ready',
  DELIVERED = 'delivered',
}

export enum EDeliveryType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export interface Order extends Document {
  goods: [
    {
      count: number;
      good: mongoose.Schema.Types.ObjectId;
    },
  ];
  total_price: number;
  user: mongoose.Schema.Types.ObjectId;
  address: mongoose.Schema.Types.ObjectId;
  delivery_type: EDeliveryType;
  status: EOrderStatus;
}
