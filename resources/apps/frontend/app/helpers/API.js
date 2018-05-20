import axios from 'axios';
import config from './../config';

const api = axios.create({
  baseURL: config.API_URL,
});

api.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export default api;
