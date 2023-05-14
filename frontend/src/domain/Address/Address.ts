import { IDtoAddress } from "./DtoAddress.interface";

export class Address {
  _id: string;
  city: string;
  street: string;
  building: string;
  apartment: string;

  constructor(dto?: IDtoAddress) {
    this._id = dto?._id || "";
    this.city = dto?.city || "";
    this.street = dto?.street || "";
    this.building = dto?.building || "";
    this.apartment = dto?.apartment || "";
  }

  get isValid() {
    return !!this.city && !!this.street && !!this.building && !!this.apartment
  }

  get putValues() {
    return {
      city: this.city,
      street: this.street,
      building: this.building,
      apartment: this.apartment,
    }
  }
}