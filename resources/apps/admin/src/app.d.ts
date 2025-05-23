// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'svelte-icons/fa/*.svelte' {
	const e: any;
	export default e;
}
declare module 'svelte-icons/md/*.svelte' {
	const e: any;
	export default e;
}

export {};
