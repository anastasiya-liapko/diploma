<script lang="ts" setup>

defineProps<{
  icon: string;
  title: string;
  description?: string;
  buttonText: string;
}>();
</script>

<template>
  <v-sheet max-width="600" rounded="lg" width="100%" class="not-found pa-4 text-center mx-auto">
    <v-icon class="mb-5" color="indigo-accent-4" :icon="icon" size="112"></v-icon>

    <h2 class="text-h5 mb-6">{{ title }}</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">{{ description }}</p>

    <v-btn class="text-none mt-5" color="indigo-accent-4" rounded ripple size="x-large" :to="{ name: 'Catalog' }">
      {{ buttonText }}
    </v-btn>
  </v-sheet>
</template>

<style lang="scss">
.not-found {
  margin-top: 5rem;
}
</style>