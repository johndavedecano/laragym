import Noty from 'noty';

export default function(opts) {
  return new Noty(
    Object.assign(
      {
        type: 'success',
        layout: 'topRight',
        timeout: 3000,
      },
      opts
    )
  ).show();
}
