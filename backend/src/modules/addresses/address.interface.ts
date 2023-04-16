import { Document } from 'mongoose';

export interface Address extends Document {
  id: number;
  title: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  index: number;
}
