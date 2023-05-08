import { Good } from "@/domain/Good/Good"
import { IDtoCart, IDtoCartGood } from "./DtoCart.interface";

export class CartGood {
  public count: number;
  public good: Good;

  constructor(dto: IDtoCartGood) {
    this.count = dto.count;
    this.good = dto.good;
  }
}

export class Cart {
  public goods: CartGood[];
  public total_price: number;

  constructor(dto?: IDtoCart) {
    this.goods = dto?.goods || [];
    this.total_price = dto?.total_price || 0;
  }
}