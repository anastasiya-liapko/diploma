<script lang="ts" setup>
import CatalogItem from '@/components/Catalog/CatalogItem.vue'
import { useAuthStore } from "@/store/auth";
import { watchEffect } from "vue";
import { useRouter } from "vue-router";

defineProps<{
  id: string;
}>();

const router = useRouter();
const authStore = useAuthStore();
</script>

<template>
  <CatalogItem :id="id" />
</template>