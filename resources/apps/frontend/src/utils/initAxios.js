import axios from 'axios';

export default function(t) {
  const token = t ? t : localStorage.getItem('token');

  axios.defaults.baseURL = process.env.APP_API_URL;
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const errorHandler = error => {
    if (401 === error.response.status) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location = '/auth/login';
    } else {
      return Promise.reject(error);
    }
  };

  axios.interceptors.response.use(response => response, errorHandler);
}
