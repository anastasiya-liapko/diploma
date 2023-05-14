import mongoose, { Document } from 'mongoose';

export interface Address extends Document {
  city: string;
  street: string;
  building: string;
  apartment: string;
  index: number;
}
