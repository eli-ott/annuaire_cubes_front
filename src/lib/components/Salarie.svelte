<script lang="ts">
	import type { Salarie } from '$lib/models/Salarie';
	import { Cell, Row } from '@smui/data-table';
	import Button from '@smui/button';

	let {
		salarie = $bindable(),
		authed = $bindable(),
		removeSalarie
	}: { salarie: Salarie; authed: boolean; removeSalarie: any } = $props();

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
			removeSalarie();
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
			<Button variant="unelevated">Modifier</Button>
		</Cell>
	{/if}
</Row>
