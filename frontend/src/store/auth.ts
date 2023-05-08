import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthorized: !!localStorage.getItem('os_rt'),
    isAuthModalVisible: false,
  }),
})