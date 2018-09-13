import axios from 'axios';

export function load() {
  return Promise.all([subscriptions(), services(), members(), packages()]).then(
    response => ({
      subscriptions: response[0],
      services: response[1],
      members: response[2],
      packages: response[3],
    })
  );
}

export function subscriptions() {
  return axios.get('/api/stats/subscriptions').then(response => response.data);
}

export function members() {
  return axios.get('/api/stats/members').then(response => response.data);
}

export function services() {
  return axios.get('/api/stats/services').then(response => response.data);
}

export function packages() {
  return axios.get('/api/stats/packages').then(response => response.data);
}
