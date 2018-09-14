import axios from 'axios';

export function loadSystemLogs(params = {}) {
  return axios
    .get('/api/activities/system', {params})
    .then(response => response.data);
}

export function loadAttendance(params = {}) {
  return axios
    .get('/api/activities/attendance', {params})
    .then(response => response.data);
}

export function showAttendance(id) {
  return axios
    .get('/api/activities/attendance/' + id)
    .then(response => response.data);
}

export function destroyAttendance(id) {
  return axios
    .delete('/api/activities/attendance/' + id)
    .then(response => response.data);
}

export function createAttendance(data) {
  return axios
    .post('/api/activities/attendance/', data)
    .then(response => response.data);
}
