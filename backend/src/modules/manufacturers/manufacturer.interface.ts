import { Document } from 'mongoose';

export interface Manufacturer extends Document {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  siteLink: string;
}
