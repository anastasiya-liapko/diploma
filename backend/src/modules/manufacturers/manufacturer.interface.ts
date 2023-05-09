import { Document } from 'mongoose';

export interface Manufacturer extends Document {
  title: string;
  description: string;
  imageLink: string;
  siteLink: string;
}
