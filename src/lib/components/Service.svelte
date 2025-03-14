<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Service } from '$lib/models/Service';
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import ServiceDialog from './ServiceDialog.svelte';

	let { service = $bindable(), authed = $bindable() }: { service: Service; authed: boolean } =
		$props();
	let dialogOpen = $state(false);
	let selectedService: Service | undefined = $state();

	/**
	 * Delete a service
	 */
	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'service',
				id: service.id
			})
		});
		const res = await deleteFetch.json();

		if (!deleteFetch.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		invalidateAll();
	};

	/**
	 * Handle the modification of a service
	 */
	const handleModify = () => {
		selectedService = service;
		dialogOpen = true;
	};
</script>

<ServiceDialog open={dialogOpen} service={selectedService} dialogClose={() => (dialogOpen = false)}
></ServiceDialog>
<Row>
	<Cell>{service.id}</Cell>
	<Cell>{service.nom}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
			<Button variant="unelevated" onclick={handleModify}>Modifier</Button>
		</Cell>
	{/if}
</Row>
