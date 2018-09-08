import qs from 'query-string';
import get from 'lodash/get';

export default location => {
  const query = qs.parse(location || window.location.search);
  const per_page = Number(get(query, 'per_page'));
  const page = Number(get(query, 'page'));
  let params = {
    ...query,
    per_page: per_page || 5,
    page: page || 1,
  };

  if (query.is_archived) {
    params.is_archived = query.is_archived === 'true';
  }

  return params;
};
