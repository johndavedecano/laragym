import Noty from 'noty';

export default function() {
  Noty.overrideDefaults({
    layout: 'topRight',
    theme: 'relax',
    closeWith: ['click', 'button'],
    timeout: 3000,
  });
}
