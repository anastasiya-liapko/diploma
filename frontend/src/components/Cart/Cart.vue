<script lang="ts" setup>
import NotFound from "@/components/NotFound.vue"
import useCart from "@/composable/useCart";
import { useCartStore } from "@/store/cart";

// TODO: добавить итого и перейти к оформлению
const cartStore = useCartStore();
const { get, patch } = useCart();
</script>

<template>
  <v-container class="cart" fluid>
    <NotFound v-if="!cartStore.cart.goods.length && !cartStore.isLoading" icon="mdi-cart-outline"
      title="В корзине ничего нет" description="Добавьте товары в корзину" button-text="в каталог" />

    <v-row v-else-if="!cartStore.isLoading" dense>
      <v-col v-for="item in cartStore.cart.goods" :key="item.good.id" cols="12">
        <v-sheet class="ma-1" rounded :elevation="2">
          <v-card class="catalog-card">
            <v-row>
              <v-col cols="4">
                <v-img :src="item.good.imageLink" height="200px" contain></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title>
                  {{ item.good.title }}
                </v-card-title>

                <v-card-subtitle>
                  {{ item.good.id }}
                </v-card-subtitle>

                <v-card-actions class="w-25">
                  <v-text-field v-model="item.count" variant="outlined">
                    <template v-slot:prepend>
                      <v-btn color="indigo-accent-4" variant="text" @click="patch(item.good._id, item.count -= 1)"
                        :disabled="item.count === 0">
                        <v-icon color="indigo-accent-4">
                          mdi-minus
                        </v-icon>
                      </v-btn>
                    </template>
                    <template v-slot:append>
                      <v-btn color="indigo-accent-4" variant="text" @click="patch(item.good._id, item.count += 1)"
                        :disabled="item.count === 50">
                        <v-icon color="indigo-accent-4">
                          mdi-plus
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

      {{ cartStore.totalPrice }}
    </v-row>

  </v-container>
</template>

<style lang="scss"></style>