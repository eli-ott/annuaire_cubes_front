<script lang="ts">
	import type { Site } from '$lib/models/Site';
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';

	let {
		site = $bindable(),
		authed = $bindable(),
		removeSite
	}: { site: Site; authed: boolean; removeSite: any } = $props();

	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'site',
				id: site.id
			})
		});

		const res = await deleteFetch.json();

		if (res.data.status === 200) {
			removeSite();
		} else {
			alert(res.data.message);
		}
	};
</script>

<Row>
	<Cell>{site.id}</Cell>
	<Cell>{site.nom}</Cell>
	<Cell>{site.ville}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
			<Button variant="unelevated">Modifier</Button>
		</Cell>
	{/if}
</Row>
