import mongoose, { Document, Schema } from 'mongoose';

export interface Good extends Document {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  price: number;
  size: string;
  weight: number;
  category: Schema.Types.ObjectId;
  manufacturer: Schema.Types.ObjectId;
}
