import axios from 'axios';

export function login(data = {}) {
  return axios.post('/api/auth/login', data).then(response => response.data);
}

export function forgot(data = {}) {
  return axios.post('/api/auth/forgot', data).then(response => response.data);
}

export function reset(data = {}) {
  return axios.post('/api/auth/reset', data).then(response => response.data);
}
