import get from 'lodash/get';

export default {
  NODE_ENV: get(process, 'env.NODE_ENV', 'development'),
  API_URL: get(process, 'env.API_URL', 'http://localhost:8000'),
};
