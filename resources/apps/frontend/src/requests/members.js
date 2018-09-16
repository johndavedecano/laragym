import axios from 'axios';

export function loadMembers(params = {}) {
  return axios.get('/api/users', {params}).then(response => response.data);
}

export function showMember(serviceId) {
  return axios.get('/api/users/' + serviceId).then(response => response.data);
}

export function destroyMember(serviceId) {
  return axios
    .delete('/api/users/' + serviceId)
    .then(response => response.data);
}

export function createMember(data) {
  return axios.post('/api/users', data).then(response => response.data);
}

export function updateMember(serviceId, data) {
  return axios
    .put('/api/users/' + serviceId, data)
    .then(response => response.data);
}

export function uploadAvatar(data) {
  return axios.post('/api/upload', data).then(response => response.data);
}
