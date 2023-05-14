import { IDtoAddress } from "./DtoAddress.interface";

export class Address {
  _id: string;
  city: string;
  street: string;
  building: string;
  apartment: string;
  index: number | null;

  constructor(dto?: IDtoAddress) {
    this._id = dto?._id || "";
    this.city = dto?.city || "";
    this.street = dto?.street || "";
    this.building = dto?.building || "";
    this.apartment = dto?.apartment || "";
    this.index = dto?.index || null;
  }

  get isValid() {
    return !!this.city && !!this.street && !!this.building && !!this.apartment && !!this.index
  }

  get putValues() {
    return {
      city: this.city,
      street: this.street,
      building: this.building,
      apartment: this.apartment,
      index: this.index,
    }
  }
}