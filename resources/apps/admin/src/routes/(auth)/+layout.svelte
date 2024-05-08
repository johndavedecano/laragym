<script>
	import Logo from '$lib/components/Logo.svelte';
	import Wrapper from '$lib/components/wrapper.svelte';
</script>

<Wrapper>
	<div class="login from-blue-800 to-indigo-900 lg:bg-gradient-to-r">
		<div class="login-card">
			<div class="mx-auto mb-8 flex justify-center">
				<Logo />
			</div>
			<slot />
		</div>
	</div>
</Wrapper>

<style>
	.login {
		@apply fixed bottom-0 left-0 right-0 top-0 flex h-full w-full items-center justify-center overflow-y-auto bg-white;
	}

	.login-card {
		@apply mx-4 rounded-xl bg-white p-8 shadow-none lg:my-8 lg:shadow-lg;
		width: 500px;
		max-width: 100%;
	}
</style>
