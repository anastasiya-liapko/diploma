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
    patch(data.value._id, 1)
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
          <v-col cols="4">
            <v-img :src="data.imageLink" width="300px" contain></v-img>
          </v-col>

          <v-col cols="8">
            <p class="mb-4">
              {{ data.description }}
            </p>

            <ul class="ps-4 mb-6">
              <li>
                id: {{ data.id }}
              </li>
              <li>
                size: {{ data.size }}
              </li>
              <li>
                weight: {{ data.weight }}
              </li>
              <li>
                manufaturer: {{ data.manufacturer.title }}
              </li>
              <li>
                price: {{ data.price }}
              </li>
            </ul>

            <v-btn block class="text-none" :color="buttonColor" ripple size="default" variant="flat"
              @click.stop="addToCart">
              {{ buttonText }}
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
  </v-container>
  <!-- </v-sheet> -->
</template>

<style lang="scss"></style>