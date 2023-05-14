<script lang="ts" setup>
import { ref } from 'vue';
import useCart from '@/composable/useCart';
import useOrder from '@/composable/useOrder';
import { Order } from '@/domain/Order/Order';
import OrderCard from "@/components/Order/OrderCard.vue"

const props = defineProps<{
  id: string;
}>();

const data = ref<Order>();
const isLoading = ref<boolean>(true);
const { getById } = useOrder();
const { get: getCart } = useCart();

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const response = await getById(+props.id);

    if (response) {
      data.value = response
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

load();
getCart();
</script>

<template>
  <v-container class="order-item" fluid>
    <h1 v-if="!isLoading && data" class="mx-auto text-h5 text-sm-h4 pb-2 pt-2 pt-sm-4 pt-md-6">
      Заказ успешно оформлен
    </h1>
    <p v-if="!isLoading && data" class="mx-auto text-body-1 pb-4 pb-md-6">
      Мы получили ваш заказ. Скоро свяжемся с вами для подтверждения.
    </p>
    <v-sheet v-if="isLoading" max-width="750" class="bg-grey-lighten-3 text-body-2 mx-auto" rounded="lg"></v-sheet>
    <OrderCard v-if="data" :data="data" />
  </v-container>
</template>

<style lang="scss">
.order-item {
  max-width: 750px;
  margin-left: auto;
  margin-right: auto;
}
</style>