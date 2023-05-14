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
    dialog.value = false;
  }

  isLoading.value = false;
}
</script>

<template>
  <v-dialog v-model="dialog" width="600">
    <v-card>
      <v-card-title>
        <span class="text-h6 text-sm-h5">Войти или зарегистрироваться</span>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="data.email" label="Электронная почта" required variant="outlined"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="data.password" label="Пароль" type="password" required
              variant="outlined"></v-text-field>
          </v-col>
        </v-row>
        <small class="caption">Если вы не регистрировались ранее, придумайте логин и пароль для регистрации</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo-accent-4" variant="text" @click="dialog = false">
          Отменить
        </v-btn>
        <v-btn class="text-none text-subtitle-1" color="indigo-accent-4" variant="flat" ripple :loading="isLoading"
          :disabled="!data.isValid" @click="submit">
          Войти
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>