import { IDtoGood } from "../Good/DtoGood.interface";

export interface IDtoCartGood {
  count: number;
  good: IDtoGood;
}

export interface IDtoCart {
  goods: IDtoCartGood[];
  total_price: number;
}