import axios from 'axios';
import config from './../config';

const API = axios.create({
  baseURL: config.API_URL,
});

API.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token'
)}`;

export default API;
