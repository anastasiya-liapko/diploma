import { Document } from 'mongoose';

export interface Store extends Document {
  name: string;
  addresses: string[];
}
