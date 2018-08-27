import axios from 'axios';

export function loadServices(params = {}) {
  return axios.get('/api/services', {params}).then(response => response.data);
}

export function showService(serviceId) {
  return axios
    .get('/api/services/' + serviceId)
    .then(response => response.data);
}

export function destroyService(serviceId) {
  return axios
    .delete('/api/services/' + serviceId)
    .then(response => response.data);
}

export function createService(data) {
  return axios.post('/api/services', data).then(response => response.data);
}

export function updateService(serviceId, data) {
  return axios
    .put('/api/services/' + serviceId, data)
    .then(response => response.data);
}
