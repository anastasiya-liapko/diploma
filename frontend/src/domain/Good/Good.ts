import { Manufacturer } from "../Manufacturer/Manufacturer";
import { IDtoGood } from "./DtoGood.interface";

export class Good {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  category: any; //TODO: type
  manufacturer: Manufacturer;
  price: number;
  size: number | null;
  weight: number;

  constructor(dto: IDtoGood) {
    this.id = dto.id;
    this.title = dto.title;
    this.description = dto.description;
    this.imageLink = dto.imageLink;
    this.manufacturer = new Manufacturer(dto.manufacturer);
    this.category = dto.category;
    this.price = dto.price;
    this.size = dto.size;
    this.weight = dto.weight;
  }
}