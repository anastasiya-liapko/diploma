<script lang="ts" setup>
import NotFound from "@/components/NotFound.vue";
import useCart from "@/composable/useCart";
import { useCartStore } from "@/store/cart";

// TODO: добавить итого и перейти к оформлению
const cartStore = useCartStore();
const { get, patch } = useCart();
</script>

<template>
  <v-container class="cart" fluid>
    <h1 v-if="cartStore.cart.goods.length && !cartStore.isLoading" class="text-h3 pb-6 pt-6">Корзина ({{
      cartStore.totalCount }})</h1>

    <NotFound v-if="!cartStore.cart.goods.length && !cartStore.isLoading" icon="mdi-cart-outline"
      title="В корзине ничего нет" description="Добавьте товары в корзину" button-text="в каталог" />

    <v-row v-else-if="!cartStore.isLoading" dense>
      <v-col v-for="item in cartStore.cart.goods" :key="item.good.id" cols="12">
        <v-sheet class="ma-1" rounded :elevation="2">
          <v-card class="catalog-card">
            <v-row>
              <v-col cols="12" sm="4">
                <v-img :src="item.good.imageLink" height="200px" contain></v-img>
              </v-col>
              <v-col cols="12" sm="8">
                <v-card-title>
                  {{ item.good.title }}
                </v-card-title>

                <v-card-subtitle>
                  {{ item.good.id }}
                </v-card-subtitle>

                <v-card-actions class="cart__actions">
                  <v-text-field v-model="item.count" variant="outlined"
                    @update:modelValue="patch(item.good._id, item.count)">
                    <template v-slot:prepend>
                      <v-btn color="indigo-accent-4" variant="text" @click="patch(item.good._id, item.count -= 1)"
                        :disabled="item.count === 1">
                        <v-icon color="indigo-accent-4">
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <v-btn color="indigo-accent-4" variant="text" @click="patch(item.good._id, item.count += 1)"
                        :disabled="item.count === 100">
                        <v-icon color="indigo-accent-4">
                          mdi-plus
                        </v-icon>
                      </v-btn>
                      <v-btn color="indigo-accent-4" variant="text" @click="patch(item.good._id, 0)">
                        <v-icon color="indigo-accent-4">
                          mdi-trash-can-outline
                        </v-icon>
                      </v-btn>
                    </template>
                  </v-text-field>
                </v-card-actions>

                <v-card-title>
                  {{ item.good.price }} руб.
                </v-card-title>
              </v-col>
            </v-row>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>

    <div v-if="cartStore.cart.goods.length && !cartStore.isLoading">
      <v-row>
        <v-col cols="6">
          Количество
        </v-col>
        <v-col cols="6" class="text-right">
          {{ cartStore.totalCount }} ед.
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          Стоимость товаров
        </v-col>
        <v-col cols="6" class="text-right">
          {{ cartStore.totalPrice }} руб.
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-center">
          <v-btn color="indigo-accent-4" class="text-none text-subtitle-1" ripple size="default" variant="flat"
            :to="{ name: 'Order' }">
            Перейти к оформлению
          </v-btn>
        </v-col>
      </v-row>
    </div>

  </v-container>
</template>

<style lang="scss">
.cart {
  &__actions {
    max-width: 20rem;
  }
}
</style>