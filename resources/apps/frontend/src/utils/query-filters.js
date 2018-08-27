import qs from 'query-string';
import get from 'lodash/get';

export default location => {
  const query = qs.parse(location || window.location.search);
  const limit = Number(get(query, 'limit'));
  const offset = Number(get(query, 'offset'));
  let params = {
    ...query,
    limit: limit || 20,
    offset: offset || 0,
  };

  if (query.is_archived) {
    params.is_archived = query.is_archived === 'true';
  }

  return params;
};
