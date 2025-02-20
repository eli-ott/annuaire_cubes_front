<script lang="ts">
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Site from './Site.svelte';
	import SiteDialog from './SiteDialog.svelte';

	let { data }: PageProps = $props();
	let dialogOpen = $state(false);
</script>

<SiteDialog dialogClose={() => (dialogOpen = false)} open={dialogOpen} site={undefined}
></SiteDialog>
<section class="list-container">
	{#if data.authed}
		<Button variant="raised" onclick={() => (dialogOpen = true)}>Ajouter un site</Button>
	{/if}
	<div class="sites-container">
		<DataTable table$aria-label="Sites">
			<Head>
				<Row>
					<Cell>Id</Cell>
					<Cell>Nom</Cell>
					<Cell>Ville</Cell>
					{#if data.authed}
						<Cell>Actions</Cell>
					{/if}
				</Row>
			</Head>
			<Body>
				{#each data.sites as site}
					<Site {site} authed={data.authed} />
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

		.sites-container {
			@include main.flex();

			width: 100%;
		}
	}
</style>
