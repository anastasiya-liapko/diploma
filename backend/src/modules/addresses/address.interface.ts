import mongoose, { Document } from 'mongoose';

export interface Address extends Document {
  title: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  index: number;
}
