import { IDtoAddress } from "../Address/DtoAddress.interface";

export interface IDtoStore {
  _id: string;
  name: string;
  addresses: IDtoAddress[]
}