import { Document } from 'mongoose';

export interface Category extends Document {
  id: number;
  title: string;
}
