<script lang="ts" setup>
import useCart from '@/composable/useCart';
import { Good } from '@/domain/Good/Good';
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import { computed } from 'vue';

const props = defineProps<{
  data: Good
}>();

const authStore = useAuthStore();
const cartStore = useCartStore();
const { patch } = useCart();

const addToCart = (): void => {
  if (!authStore.isAuthorized) {
    authStore.isAuthModalVisible = !authStore.isAuthModalVisible
  } else {
    if (isAddedToCart.value) {
      patch(props.data._id, 0)
    } else {
      patch(props.data._id, 1)
    }
  }
}

const routeToCatalogItem = (): void => {
  router.push({ name: 'CatalogItem', params: { id: props.data.id } })
}

const isAddedToCart = computed<boolean>(() => {
  return !!cartStore.cart.goods.find(item => item.good._id === props.data._id)
})

const buttonText = computed<string>(() => {
  return isAddedToCart.value ? "в корзине" : "в корзину"
})

const buttonColor = computed<string>(() => {
  return isAddedToCart.value ? "success" : "indigo-accent-4"
})
</script>

<template>
  <v-card @click="routeToCatalogItem" class="catalog-card">
    <v-img :src="data.imageLink" height="200px" contain></v-img>

    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ data.description }}
    </v-card-subtitle>

    <v-card-actions>
      <p>{{ data.price }} руб.</p>
      <v-spacer />
      <v-btn class="text-none text-subtitle-1" ripple :color="buttonColor" size="default" variant="flat"
        @click.stop="addToCart">
        {{ buttonText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss"></style>