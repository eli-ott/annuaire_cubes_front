<script lang="ts">
	import type { Salarie } from '$lib/models/Salarie';
	import { Cell, Row } from '@smui/data-table';
	import Button from '@smui/button';
	import { invalidateAll } from '$app/navigation';

	let { admin = $bindable(), authed = $bindable(), update }: { admin: Salarie; authed: boolean, update: any } = $props();

	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'admin',
				id: admin.idUser
			})
		});
		const res = await deleteFetch.json();

		if (res.data.status === 200) {
			update();
		} else {
			alert(res.data.message);
		}
	};
</script>

<Row>
	<Cell>{admin.nom}</Cell>
	<Cell>{admin.prenom}</Cell>
	<Cell>{admin.telPortable}</Cell>
	<Cell>{admin.telFixe}</Cell>
	<Cell>{admin.email}</Cell>
	<Cell>{admin.service.nom}</Cell>
	<Cell>{admin.site.nom}</Cell>
	<Cell>{admin.site.ville}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
		</Cell>
	{/if}
</Row>
