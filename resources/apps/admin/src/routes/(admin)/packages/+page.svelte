<script>
	import { goto } from '$app/navigation';

	let items = Array.from(new Array(10));

	let title = 'Manage Packages';
</script>

<svelte:head>
	<title>{title}</title>
</svelte:head>

<div class="p-4 lg:p-6">
	<div class="card bg-white p-4 lg:p-6">
		<header class="card-header mb-6 flex items-center">
			<h3 class="h3">{title}</h3>
			<div class="flex-1"></div>
			<button
				type="submit"
				class="btn variant-filled-primary text-white"
				on:click={() => goto('/packages/new')}
			>
				Add Item
			</button>
		</header>
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table-hover table">
				<thead>
					<tr>
						<th>Position</th>
						<th>Name</th>
						<th>Symbol</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{#each items as row, i}
						<tr>
							<td>sdfas</td>
							<td>testest</td>
							<td>setestestes</td>
							<td>setestest</td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="3">Calculated Total Weight</th>
						<td>{items.length}</td>
					</tr>
				</tfoot>
			</table>
		</div>
	</div>
</div>
