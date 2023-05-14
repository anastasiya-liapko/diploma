<script lang="ts" setup>
import useAddress from '@/composable/useAddress';
import { computed, ref } from 'vue';
import { Address } from '@/domain/Address/Address';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "submit", value: Address): void;
}>();

const { post: postAddress } = useAddress();

const isLoading = ref<boolean>(false);
const data = ref<Address>(new Address())

const dialog = computed({
  get(): boolean {
    return props.modelValue
  },
  set(newValue: boolean): void {
    emit("update:modelValue", newValue)
  }
})

const submit = async (): Promise<void> => {
  isLoading.value = true;

  const response = await postAddress(data.value.putValues);
  if (response) {
    emit('submit', response);
    dialog.value = false;
  }

  isLoading.value = false;
}
</script>

<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>
        <span class="text-h6 text-sm-h5">Добавить новый адрес</span>
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col cols="12">
            <v-text-field v-model="data.city" label="Город" required variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="data.street" label="Улица" required variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="data.building" label="Дом" required variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="data.apartment" label="Квартира" required variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="data.index" label="Почтовый индекс" required type="number"
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo-accent-4" variant="text" @click="dialog = false">
          Отменить
        </v-btn>
        <v-btn class="text-none text-subtitle-1" color="indigo-accent-4" variant="flat" ripple :loading="isLoading"
          :disabled="!data.isValid" @click="submit">
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>