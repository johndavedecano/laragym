<script>
	export let status = '';

	$: badgeStyle =
		{
			active: 'variant-filled-success text-white',
			inactive: 'variant-filled-warning',
			suspended: 'variant-filled-secondary text-white',
			expired: 'variant-filled-tertiary text-white'
		}[status] || 'variant-filled-primary text-white';
</script>

<span class={`badge ${badgeStyle}`}>
	{status}
</span>
