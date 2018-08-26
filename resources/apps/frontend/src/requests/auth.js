import axios from 'axios';

export function login(data = {}) {
  return axios.post('/api/auth/login', data).then(response => response.data);
}
