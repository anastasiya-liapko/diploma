import { Document, Schema } from 'mongoose';

export enum ModulePermission {
  READ = 'READ',
  WRITE = 'WRITE',
}

export interface Module {
  name: string;
  permission: ModulePermission;
}

export interface Retail {
  id: number;
  points: number[];
}

export interface Structure {
  club: Schema.Types.ObjectId;
  retails: Retail[];
}

export interface User extends Document {
  login: string;
  password: string;
  BMSAdmin: boolean;
  modules: Module[];
  structure: Structure[];
  name: string;
  email: string;
  comment: string;
  refresh: string;
}
