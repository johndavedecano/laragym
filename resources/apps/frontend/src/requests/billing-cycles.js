import axios from 'axios';

export function loadBillingCycles(params = {}) {
  return axios.get('/api/cycles', {params}).then(response => response.data);
}

export function showBillingCycle(cycleId) {
  return axios.get('/api/cycles/' + cycleId).then(response => response.data);
}

export function destroyBillingCycle(cycleId) {
  return axios.delete('/api/cycles/' + cycleId).then(response => response.data);
}

export function createBillingCycle(data) {
  return axios.post('/api/packages', data).then(response => response.data);
}

export function updateBillingCycle(cycleId, data) {
  return axios
    .put('/api/cycles/' + cycleId, data)
    .then(response => response.data);
}
