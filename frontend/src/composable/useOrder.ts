import { CartApi } from "@/api/CartApi";
import { OrderApi } from "@/api/OrderApi";
import { Cart } from "@/domain/Cart/Cart";
import { Order } from "@/domain/Order/Order";
import { OrderForm } from "@/domain/Order/OrderForm";
import { useCartStore } from "@/store/cart";
import { ref } from "vue";

export default () => {
  const orderApi = new OrderApi();

  const get = async (_id: string): Promise<Order | false> => {
    try {
      const response = await orderApi.getById(_id);
      return new Order(response.data);
    } catch (e) {
      console.log(e);
      return false
    }
  }

  const post = async (data: OrderForm): Promise<Order | false> => {
    try {
      const res = await orderApi.post(data);
      return new Order(res.data)
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  return {
    get,
    post
  }
};