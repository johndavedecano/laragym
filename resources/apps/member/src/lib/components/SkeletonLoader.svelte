<script>
	// @ts-nocheck
	/**
	 * @type {'card' | 'list' | 'text' | 'avatar'}
	 */
	let { type = 'card', count = 1, class: className = '' } = $props();
</script>

{#if type === 'card'}
	{#each Array(count) as _}
		<div class="card animate-pulse bg-surface-800 p-4 {className}">
			<div class="mb-4 h-4 w-1/3 rounded bg-surface-600"></div>
			<div class="mb-2 h-3 w-full rounded bg-surface-600"></div>
			<div class="mb-2 h-3 w-5/6 rounded bg-surface-600"></div>
			<div class="h-3 w-4/6 rounded bg-surface-600"></div>
		</div>
	{/each}
{:else if type === 'list'}
	{#each Array(count) as _}
		<div class="animate-pulse border-b border-surface-700 px-4 py-3 {className}">
			<div class="flex items-center gap-3">
				<div class="h-10 w-10 shrink-0 rounded-full bg-surface-600"></div>
				<div class="flex-1">
					<div class="mb-2 h-3 w-1/3 rounded bg-surface-600"></div>
					<div class="h-3 w-2/3 rounded bg-surface-600"></div>
				</div>
			</div>
		</div>
	{/each}
{:else if type === 'text'}
	{#each Array(count) as _}
		<div class="animate-pulse {className}">
			<div class="mb-2 h-3 w-full rounded bg-surface-600"></div>
			<div class="h-3 w-4/5 rounded bg-surface-600"></div>
		</div>
	{/each}
{:else if type === 'avatar'}
	<div class="animate-pulse {className}">
		<div class="mx-auto h-20 w-20 rounded-full bg-surface-600"></div>
		<div class="mx-auto mt-3 h-4 w-24 rounded bg-surface-600"></div>
		<div class="mx-auto mt-2 h-3 w-32 rounded bg-surface-600"></div>
	</div>
{/if}
