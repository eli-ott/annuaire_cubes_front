<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import { Salarie, Select } from '$lib/components/index.js';
	import DataTable, { Body, Cell, Head, Row, SortValue } from '@smui/data-table';

	let { data } = $props();
</script>

<main>
	<div class="title">
		<h1>Annuaire interne</h1>
		<p>
			Dans cet annuaire retrouvez toutes les personnes qui travaille dans notre entreprise, peut
			importe la localisation. <br /> <br />
			Recherchez vos collègues ou interlocuteurs en fonction de leurs services, site, nom etc.
		</p>
	</div>
	<section class="list-container">
		<div class="filter-container">
			<Filter services={data.services} sites={data.sites} />
		</div>
		<div class="salaries-container">
			<DataTable table$aria-label="Salaries">
				<Head>
					<Row>
						<Cell>Nom</Cell>
						<Cell>Prénom</Cell>
						<Cell>Tel. portable</Cell>
						<Cell>Tel. fixe</Cell>
						<Cell>Email</Cell>
						<Cell>Service</Cell>
						<Cell>Site</Cell>
					</Row>
				</Head>
				<Body>
					{#each data.salaries as salarie}
						<Salarie {salarie} />
					{/each}
				</Body>
			</DataTable>
		</div>
	</section>
</main>

<style lang="scss">
	@use '$lib/style/main';

	:global(.mdc-data-table) {
		width: 95%;
	}
	main {
		height: 100vh;

		.list-container {
			.salaries-container {
				@include main.flex();

				width: 100%;
			}
		}
	}
</style>
