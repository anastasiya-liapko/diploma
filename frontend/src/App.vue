<script lang="ts" setup>
import { watchEffect } from 'vue';
import useCart from './composable/useCart';
import { useCartStore } from './store/cart';
import { useAuthStore } from './store/auth';
import router from './router';
import AuthModal from "@/components/Auth/AuthModal.vue"

const { get: getCart, reset: resetCart } = useCart();
const authStore = useAuthStore();

watchEffect(() => {
  if (!authStore.isAuthorized) {
    resetCart();
    router.push({ name: 'Catalog' })
  } else {
    getCart()
  }
})
</script>

<template>
  <AuthModal v-model="authStore.isAuthModalVisible" />
  <router-view />
</template>


