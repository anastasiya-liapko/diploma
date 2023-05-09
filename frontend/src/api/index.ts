import { Unauth } from '@/domain/Auth/Unauth';
import router from '@/router';
import axios from 'axios';

let baseURL = '/api';
if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:8085/api'

const server = axios.create({
  baseURL,
  timeout: 600000,
  headers: {
    authorizationbasic: `Basic ${import.meta.env.VITE_VUE_APP_REQUST_TOKEN}`
  }
})

// const refresh = async (): Promise<void> => {
//   const res = await server.post(`/auth/refresh`, new Unauth(localStorage.getItem('os_rt')))
//   localStorage.setItem('os_at', res.data.token);
//   localStorage.setItem('os_rt', res.data.refreshToken);
// }

const logout = async (): Promise<void> => {
  await server.post(`/auth/logout`, new Unauth(localStorage.getItem('os_rt')))
  localStorage.removeItem('os_at');
  localStorage.removeItem('os_rt');
  router.push({ name: "Catalog" })
}

server.interceptors.request.use(async (request) => {
  const accessToken = localStorage.getItem(`os_at`);

  if (accessToken) {
    request.headers.authorization = `Bearer ${accessToken}`;
  }

  return request;
});

server.interceptors.response.use(null, async (error) => {
  const originalRequest = error.response.config;

  if (error.response && error.response.status === 401) {
    // if (error.response.data.message === 'jwt expired' || error.response.data.message === 'jwt invalid') {
    //   try {
    //     await refresh();
    //     return await server(originalRequest);
    //   } catch (e) {
    //     if (error.response.status === 401) {
    //       await logout();
    //     } else {
    //       throw e;
    //     }
    //   }
    // } else {
    //   await logout();
    //   throw error.response || error;
    // }
    await logout();
    throw error.response || error;
  } else {
    throw error.response || error;
  }
})

export { server }
