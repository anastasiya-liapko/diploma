<script lang="ts" setup>
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
  <div>lk</div>
</template>

