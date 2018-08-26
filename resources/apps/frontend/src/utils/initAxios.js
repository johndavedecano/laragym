import axios from 'axios';

export default function() {
  const token = localStorage.getItem('token');

  axios.defaults.baseURL = process.env.APP_API_URL;

  const errorHandler = error => {
    if (401 === error.response.status) {
      localStorage.removeItem('token');
      window.location = '/auth/login';
    } else {
      return Promise.reject(error);
    }
  };

  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
    axios.interceptors.response.use(response => response, errorHandler);
  }
}
