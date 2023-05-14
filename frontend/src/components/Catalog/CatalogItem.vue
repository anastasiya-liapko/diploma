<script lang="ts" setup>
import { Good } from '@/domain/Good/Good';
import { computed, ref } from 'vue';
import { CatalogApi } from "@/api/CatalogApi"
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import useCart from '@/composable/useCart';

const props = defineProps<{
  id: string;
}>();

const api = new CatalogApi()
const data = ref<Good>();
const isLoading = ref<boolean>(true);
const authStore = useAuthStore();
const cartStore = useCartStore();
const { patch } = useCart();

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const response = await api.searchOne(+props.id);

    data.value = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

const addToCart = (): void => {
  if (!data.value) return
  if (!authStore.isAuthorized) {
    authStore.isAuthModalVisible = !authStore.isAuthModalVisible
  } else {
    if (isAddedToCart.value) {
      patch(data.value._id, 0)
    } else {
      patch(data.value._id, 1)
    }
  }
}

const isAddedToCart = computed<boolean>(() => {
  return !!cartStore.cart.goods.find(item => item.good._id === data.value?._id)
})

const buttonText = computed<string>(() => {
  return isAddedToCart.value ? "в корзине" : "в корзину"
})

const buttonColor = computed<string>(() => {
  return isAddedToCart.value ? "success" : "indigo-accent-4"
})

load();
</script>

<template>
  <v-container fluid>
    <v-sheet v-if="isLoading" min-height="300" max-width="750" class="bg-grey-lighten-3 text-body-2 mx-auto"
      rounded="lg"></v-sheet>
    <v-sheet v-else-if="data" border="lg opacity-12" class="text-body-2 mx-auto" max-width="750" rounded="lg">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="4">
            <v-img :src="data.imageLink" width="300px" contain></v-img>
          </v-col>

          <v-col cols="12" sm="8">
            <h1 v-if="!isLoading && data" class="mx-auto text-h5 pb-6 pt-6">{{ data.title }}</h1>
            <p class="mb-4">
              {{ data.description }}
            </p>

            <v-list lines="one" density="compact">
              <v-list-item :title="`артикул: ${data.id}`"></v-list-item>
              <v-list-item v-if="data.size" :title="`размер: ${data.size}`"></v-list-item>
              <v-list-item v-if="data.weight" :title="`вес: ${data.weight}`"></v-list-item>
              <v-list-item v-if="data.manufacturer.title"
                :title="`производитель: ${data.manufacturer.title}`"></v-list-item>
              <v-list-item :title="`стоимость: ${data.price} руб.`"></v-list-item>
            </v-list>


            <v-btn block class="text-none mt-5" :color="buttonColor" ripple size="default" variant="flat"
              @click.stop="addToCart">
              {{ buttonText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
</template>

<style lang="scss"></style>