import axios from 'axios';

export const Endpoints = {
  BaseURL:
    process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3333/',
};

const api = axios.create({
  baseURL: Endpoints.BaseURL,
  timeout: 7000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export default api;
