import { CartApi } from "@/api/CartApi";
import { Cart } from "@/domain/Cart/Cart";
import { useCartStore } from "@/store/cart";
import { ref } from "vue";

export default () => {
  const cartApi = new CartApi();
  const cartStore = useCartStore();

  const get = async (): Promise<void> => {
    cartStore.isLoading = true;
    try {
      const response = await cartApi.get();
      cartStore.cart = response.data;
    } catch (e) {
      console.log(e)
    } finally {
      cartStore.isLoading = false;
    }
  }

  const patch = async (_id: string, count: number): Promise<void> => {
    try {
      const response = await cartApi.patch(_id, count);
      cartStore.cart = response.data;
    } catch (e) {
      console.log(e)
    }
  }

  const reset = (): void => {
    cartStore.cart = new Cart();
  }

  return {
    isLoading: cartStore.isLoading,
    cart: cartStore.cart,
    get,
    patch,
    reset
  }
};