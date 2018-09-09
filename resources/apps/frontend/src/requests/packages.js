import axios from 'axios';

export function loadPackages(params = {}) {
  return axios.get('/api/packages', {params}).then(response => response.data);
}

export function showPackage(packageId) {
  return axios
    .get('/api/packages/' + packageId)
    .then(response => response.data);
}

export function destroyPackage(packageId) {
  return axios
    .delete('/api/packages/' + packageId)
    .then(response => response.data);
}

export function createPackage(data) {
  return axios.post('/api/packages', data).then(response => response.data);
}

export function updatePackage(packageId, data) {
  return axios
    .put('/api/packages/' + packageId, data)
    .then(response => response.data);
}
