import { Manufacturer } from "../Manufacturer/Manufacturer";

export interface IDtoGood {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  category: any; //TODO: type
  manufacturer: Manufacturer;
  price: number;
  size: number | null;
  weight: number;
}