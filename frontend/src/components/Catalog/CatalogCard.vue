<script lang="ts" setup>
import { Good } from '@/domain/Good/Good';

defineProps<{
  data: Good
}>();
</script>

<template>
  <v-card class="catalog-card">
    <v-img :src="data.imageLink" height="200px" contain></v-img>

    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ data.description }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text">
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss"></style>