import { IDtoManufacturer } from "./DtoManufacturer.interface";

export class Manufacturer {
  _id: string;
  title: string;
  description: string;
  imageLink: string;
  siteLink: string;

  constructor(dto: IDtoManufacturer) {
    this._id = dto._id;
    this.title = dto.title;
    this.description = dto.description;
    this.imageLink = dto.imageLink;
    this.siteLink = dto.siteLink;
  }
}