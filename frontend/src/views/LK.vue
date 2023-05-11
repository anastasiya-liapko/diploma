<script lang="ts" setup>
import { useAuthStore } from "@/store/auth";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";
import LK from "@/components/LK/LK.vue"

const authStore = useAuthStore();
const router = useRouter()

watchEffect(() => {
  if (!authStore.isAuthorized) {
    router.push({ name: 'Catalog' })
  }
})
</script>

<template>
  <LK />
</template>

