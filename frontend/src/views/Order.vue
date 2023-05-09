<script lang="ts" setup>
import Order from "@/components/Order/Order.vue"
import { useAuthStore } from "@/store/auth";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

watchEffect(() => {
  if (!authStore.isAuthorized) {
    router.push({ name: 'Catalog' })
  }
})
</script>

<template>
  <Order />
</template>
