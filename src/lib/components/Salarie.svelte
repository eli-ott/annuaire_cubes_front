<script lang="ts">
	import type { Salarie } from '$lib/models/Salarie';
	import type { Service } from '$lib/models/Service';
	import type { Site } from '$lib/models/Site';
	import { Cell, Row } from '@smui/data-table';
	import Button from '@smui/button';
	import { invalidateAll } from '$app/navigation';
	import SalarieDialog from './SalarieDialog.svelte';
	import SiteDialog from './SiteDialog.svelte';

	let {
		salarie = $bindable(),
		authed = $bindable(),
		handleModify
	}: { salarie: Salarie; authed: boolean; handleModify: any } = $props();

	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'salarie',
				id: salarie.id
			})
		});
		const res = await deleteFetch.json();

		if (res.data.status === 200) {
			invalidateAll();
		} else {
			alert(res.data.message);
		}
	};
</script>

<Row>
	<Cell>{salarie.nom}</Cell>
	<Cell>{salarie.prenom}</Cell>
	<Cell>{salarie.telPortable}</Cell>
	<Cell>{salarie.telFixe}</Cell>
	<Cell>{salarie.email}</Cell>
	<Cell>{salarie.service.nom}</Cell>
	<Cell>{salarie.site.nom}</Cell>
	<Cell>{salarie.site.ville}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
			<Button variant="unelevated" onclick={handleModify}>Modifier</Button>
		</Cell>
	{/if}
</Row>
