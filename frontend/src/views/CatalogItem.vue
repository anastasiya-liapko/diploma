<script lang="ts" setup>
import CatalogItem from '@/components/Catalog/CatalogItem.vue'

defineProps<{
  id: string;
}>();
</script>

<template>
  <CatalogItem :id="id" />
</template>