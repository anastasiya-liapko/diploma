<script lang="ts" setup>
import OrderItem from "@/components/Order/OrderItem.vue"
import { useAuthStore } from "@/store/auth";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

defineProps<{
  id: string;
}>();

watchEffect(() => {
  if (!authStore.isAuthorized) {
    router.push({ name: 'Catalog' })
  }
})
</script>

<template>
  <OrderItem :id="id" />
</template>
