import keyBy from 'lodash/keyBy';

/**
 * Convert array to object.
 *
 * @param {Array} array
 * @param {String} key
 *
 * @returns {Array}
 */
const normalize = (array, key = 'id') =>
  keyBy(array, (item) => String(item[key]));

export default normalize;
