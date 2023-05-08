import { Cart } from '@/domain/Cart/Cart'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    cart: new Cart(),
    isLoading: true,
  }),

  getters: {
    totalCount: (state) => state.cart.goods.length,
    totalPrice: (state) => state.cart.total_price
  }
})