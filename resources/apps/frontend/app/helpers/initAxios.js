import axios from 'axios';
import config from './../config';

export default function initAxios() {
  const token = `Bearer ${localStorage.getItem('token')}`;
  axios.defaults.baseURL = config.API_URL;
  axios.defaults.headers.common.Authorization = token;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location = '/';
        return false;
      }

      return Promise.reject(error);
    }
  );
}
