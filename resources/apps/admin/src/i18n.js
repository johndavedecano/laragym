// import { browser } from '$app/environment'
// import { init, register } from 'svelte-i18n';
//
//
// register('en', () => import('./locales/en.json'));
// register('es', () => import('./locales/es.json'));
//
// const defaultLocale = 'es'
//
//
//
// init({
//   fallbackLocale: defaultLocale,
// 	initialLocale: browser ? window.navigator.language : defaultLocale,
// });


import { browser } from '$app/environment'
import { locale, init, register } from 'svelte-i18n'

locale.set('en')
const defaultLocale = 'es'

register('en', () => import('./locales/en.json'))
register('es', () => import('./locales/es.json'))

init({
	fallbackLocale: defaultLocale,
	initialLocale: browser ? window.navigator.language : defaultLocale,
})
