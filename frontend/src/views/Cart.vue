<script lang="ts" setup>
import Cart from "@/components/Cart/Cart.vue"
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
  <Cart />
</template>
