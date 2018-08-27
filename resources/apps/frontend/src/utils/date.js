import format from 'date-fns/format';

/**
 * Format date.
 *
 * @param {*} date
 * @param {*} custom
 */
export default function(date, custom = 'YYYY-MM-DD HH:mm A') {
  if (!date) return '-';
  return format(date, custom);
}
