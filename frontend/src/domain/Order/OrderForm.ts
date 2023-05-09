import { EDeliveryType } from "./DeliveryType.enum";

export class OrderForm {
  public address: string;
  public delivery_type: EDeliveryType;

  constructor(dto?: any) {
    this.address = dto?.address || "";
    this.delivery_type = dto?.delivery_type || EDeliveryType.PICKUP
  }
}