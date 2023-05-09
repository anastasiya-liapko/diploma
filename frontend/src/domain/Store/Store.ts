import { Address } from "../Address/Address";
import { IDtoStore } from "./DtoStore.interface";

export class Store {
  _id: string;
  name: string;
  addresses: Address[];

  constructor(dto: IDtoStore) {
    this._id = dto._id;
    this.name = dto.name;
    this.addresses = dto.addresses.map(item => new Address(item));
  }
}