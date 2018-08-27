import qs from 'query-string';
import get from 'lodash/get';

export default location => {
  const query = qs.parse(location || window.location.search);
  const limit = Number(get(query, 'limit'));
  const offset = Number(get(query, 'offset'));
  return {
    ...query,
    limit: limit || 20,
    offset: offset || 0,
  };
};
