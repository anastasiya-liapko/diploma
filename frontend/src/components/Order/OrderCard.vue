<script lang="ts" setup>
import { Address } from '@/domain/Address/Address';
import { EDeliveryType } from '@/domain/Order/DeliveryType.enum';
import { Order } from '@/domain/Order/Order';
import { StatusLabels } from "@/domain/Order/Status.const"
import { computed } from 'vue';

const props = defineProps<{
  data: Order;
}>()

const addressDescription = computed<string>(() => {
  return props.data.delivery_type === EDeliveryType.DELIVERY ? "Адрес доставки" : "Самовывоз из магазина"
})

const formatAddress = (address: Address): string => {
  return `${addressDescription.value}: ${address.city}, ${address.street}, ${address.building}/${address.apartment}`
}

// DD.MM.YYYY
const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const formatDate = (value: string): string => {
  const seconds = new Date(Date.parse(value));
  const day = seconds.toLocaleString("ru-RU", DATE_OPTIONS);
  return day;
}


</script>

<template>
  <v-sheet :elevation="4" class="text-body-2 mx-auto" max-width="750" rounded="lg">
    <v-container fluid>
      <v-row class="mb-2 mb-sm-4">
        <v-col class="text-subtitle-1 font-weight-bold" cols="8">Номер заказа: {{ data._id }}</v-col>
        <v-col class="text-right text-subtitle-1 font-weight-bold" style="color: #4CAF50" cols="4">{{
          StatusLabels[data.status]
        }}</v-col>
      </v-row>
      <v-divider :thickness="1"></v-divider>
      <v-row class="mt-2 mb-2 mt-sm-4 mb-sm-4">
        <v-col cols="8">{{ formatAddress(data.address) }}</v-col>
        <v-col class="text-right" cols="4">{{ formatDate(data.date) }}</v-col>
      </v-row>
      <v-divider :thickness="1"></v-divider>
      <v-row class="mt-2 mb-2 mt-sm-4 mb-sm-4 d-flex align-center" v-for="good in data.goods" :key="good.good._id">
        <v-col cols="2">
          <v-img :src="good.good.imageLink" width="100px" contain></v-img>
        </v-col>

        <v-col cols="10">
          <p class="mx-auto text-body-2 text-sm-subtitle-1 font-weight-medium">{{ good.good.title }}</p>
          <p class="text-caption">Артикул: {{ good.good.id }}</p>

          <v-row>
            <v-col cols="6">{{ good.count }} x {{ good.good.price }}</v-col>
            <v-col class="text-right font-weight-medium" cols="6">{{ Math.round(good.count * good.good.price) }}
              руб.</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="mt-4">
        <v-col cols="8">Количество</v-col>
        <v-col class="text-right" cols="4">{{ data.goods.length }} ед.</v-col>
      </v-row>
      <v-row dense>
        <v-col cols="8">Итоговая стоимость</v-col>
        <v-col class="text-right font-weight-medium" cols="4">{{ data.total_price }} руб.</v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>