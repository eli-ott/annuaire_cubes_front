<script lang="ts">
	import type { Service } from '$lib/models/Service';
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';

	let {
		service = $bindable(),
		authed = $bindable(),
		removeService
	}: { service: Service; authed: boolean; removeService: any } = $props();

	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'service',
				id: service.id
			})
		});

		const res = await deleteFetch.json();

		if (res.data.status === 200) {
			removeService();
		} else {
			alert(res.data.message);
		}
	};
</script>

<Row>
	<Cell>{service.id}</Cell>
	<Cell>{service.nom}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
			<Button variant="unelevated">Modifier</Button>
		</Cell>
	{/if}
</Row>
