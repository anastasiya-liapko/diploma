import axios from 'axios';

let baseURL
if (process.env.NODE_ENV === 'development') baseURL = 'http://localhost:8085'

const server = axios.create({
  baseURL,
  timeout: 600000,
  headers: {
    Authorization: `Basic ${import.meta.env.VITE_VUE_APP_REQUST_TOKEN}`
  }
})

export { server }
