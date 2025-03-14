<script lang="ts">
	import Admin from '$lib/components/Admin.svelte';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Button from '@smui/button';
	import SalarieDialog from './SalarieDialog.svelte';
	import type { Salarie, Salarie as SalarieType } from '$lib/models/Salarie';
	import { onMount } from 'svelte';
	import AdminDialog from './AdminDialog.svelte';

	let { data }: PageProps = $props();
	let dialogOpen = $state(false);
	let admins: Salarie[] = $state([]);

	/**
	 * On mount
	 */
	onMount(() => {
		getData();
	});

	/**
	 * Get the admins
	 */
	const getData = async () => {
		admins = [];

		const getFetch = await fetch('/api', {
			method: 'GET'
		});
		const res = await getFetch.json();

		if (!getFetch.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		admins = res.data.data;
	};
</script>

<AdminDialog
	open={dialogOpen}
	salaries={data.salaries}
	dialogClose={() => (dialogOpen = false)}
	update={getData}
></AdminDialog>
<section class="list-container">
	{#if data.authed}
		<Button variant="raised" onclick={() => (dialogOpen = true)}>Ajouter un admin</Button>
	{/if}
	<div class="admins-container">
		<DataTable table$aria-label="Admins">
			<Head>
				<Row>
					<Cell>Nom</Cell>
					<Cell>Prénom</Cell>
					<Cell>Tel. portable</Cell>
					<Cell>Tel. fixe</Cell>
					<Cell>Email</Cell>
					<Cell>Service</Cell>
					<Cell>Site</Cell>
					<Cell>Ville</Cell>
					{#if data.authed}
						<Cell>Actions</Cell>
					{/if}
				</Row>
			</Head>
			<Body>
				{#each admins as admin}
					<Admin {admin} authed={data.authed} update={getData} />
				{/each}
			</Body>
		</DataTable>
	</div>
</section>

<style lang="scss">
	@use '$lib/style/main';

	.list-container {
		@include main.flex($direction: column, $justify: center, $align: start, $gap: main.$margin-xl);

		width: 100%;

		.filter-container {
			width: 95%;
		}
		.admins-container {
			@include main.flex();

			width: 100%;
		}
	}
</style>
