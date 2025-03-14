<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import type { Site } from '$lib/models/Site';
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import SiteDialog from './SiteDialog.svelte';

	let { site = $bindable(), authed = $bindable() }: { site: Site; authed: boolean } = $props();
	let dialogOpen = $state(false);
	let selectedSite: Site | undefined = $state();

	const deleteElement = async () => {
		const deleteFetch = await fetch('/api', {
			method: 'delete',
			body: JSON.stringify({
				path: 'site',
				id: site.id
			})
		});
		const res = await deleteFetch.json();

		if (!deleteFetch.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		invalidateAll();
	};

	const handleModify = () => {
		selectedSite = site;
		dialogOpen = true;
	};
</script>

<SiteDialog dialogClose={() => (dialogOpen = false)} open={dialogOpen} site={selectedSite}
></SiteDialog>
<Row>
	<Cell>{site.id}</Cell>
	<Cell>{site.nom}</Cell>
	<Cell>{site.ville}</Cell>
	{#if authed}
		<Cell>
			<Button variant="text" onclick={deleteElement}>Supprimer</Button>
			<Button variant="unelevated" onclick={handleModify}>Modifier</Button>
		</Cell>
	{/if}
</Row>
