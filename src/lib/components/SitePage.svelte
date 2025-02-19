<script lang="ts">
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Site from './Site.svelte';
	import type { Site as SiteType } from '$lib/models/Site';

	let { data }: PageProps = $props();
	let sites = $state(data.sites);

	const removeSite = (idSite: number) => {
		sites = sites.filter((site: SiteType) => site.id !== idSite);
	};
</script>

<section class="list-container">
	<Button variant="raised">Ajouter un site</Button>
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
				{#each sites as site}
					<Site {site} authed={data.authed} removeSite={() => removeSite(site.id)} />
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
