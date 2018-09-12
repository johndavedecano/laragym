import qs from 'query-string';
import get from 'lodash/get';

export default location => {
  const query = qs.parse(location || window.location.search);
  const per_page = Number(get(query, 'per_page'));
  const page = Number(get(query, 'page'));
  let params = {
    ...query,
    per_page: per_page || 25,
    page: page || 1,
  };

  if (query.is_deleted) {
    params.is_deleted = query.is_deleted === 'true';
  }

  if (query.is_admin) {
    params.is_admin = query.is_admin === 'true';
  }

  if (query.is_active) {
    params.is_active = query.is_active === 'true';
  }

  return params;
};
