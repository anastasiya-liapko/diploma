import mongoose, { Document } from 'mongoose';

export interface Category extends Document {
  title: string;
}
