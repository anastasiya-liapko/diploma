<script lang="ts" setup>
import useAuth from '@/composable/useAuth';
import { Auth } from '@/domain/Auth/Auth';
import { computed, ref } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const { login } = useAuth();

const isLoading = ref<boolean>(false);
const data = ref<Auth>(new Auth())

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

  const response = await login(data.value);
  if (response) {
    // TODO: поменять иконку юзера на иконку выхода
    dialog.value = false;
  }

  isLoading.value = false;
}
</script>

<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>
        <span class="text-h5">Войти</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="data.email" label="Email*" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="data.password" label="Password*" type="password" required></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <small>*обязательные к заполнению поля</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
          Отменить
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="submit" :loading="isLoading">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>