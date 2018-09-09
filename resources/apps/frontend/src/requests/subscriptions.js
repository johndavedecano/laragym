import axios from 'axios';

export function loadSubscriptions(params = {}) {
  return axios
    .get('/api/subscriptions', {params})
    .then(response => response.data);
}

export function showSubscription(subscriptionId) {
  return axios
    .get('/api/subscriptions/' + subscriptionId)
    .then(response => response.data);
}

export function destroySubscription(subscriptionId) {
  return axios
    .delete('/api/subscriptions/' + subscriptionId)
    .then(response => response.data);
}

export function createSubscription(data) {
  return axios.post('/api/subscriptions', data).then(response => response.data);
}

export function updateSubscription(subscriptionId, data) {
  return axios
    .put('/api/subscriptions/' + subscriptionId, data)
    .then(response => response.data);
}
