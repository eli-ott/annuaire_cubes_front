<script lang="ts">
	import { Salarie, Filter } from '$lib/components/index';
	import type { Salarie as SalarieType } from '$lib/models/Salarie.js';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Button from '@smui/button';

	let { data }: PageProps = $props();
	let salaries: SalarieType[] = $state(data.salaries);
	let filteredSalaries: SalarieType[] = $state(salaries);

	let servicesSelected: number[] = $state([]);
	let sitesSelected: number[] = $state([]);
	let search: string | undefined = $state();

	// const filter = () => {
	// 	filteredSalaries = salaries.slice().filter((salarie: SalarieType) => {
	// 		if (
	// 			(!servicesSelected || servicesSelected.length === 0) &&
	// 			(!sitesSelected || sitesSelected.length === 0) &&
	// 			(!search || search.trim() === '')
	// 		) {
	// 			return true;
	// 		}

	// 		return (
	// 			(servicesSelected &&
	// 				servicesSelected.length > 0 &&
	// 				servicesSelected.includes(salarie.service.id)) ||
	// 			(sitesSelected && sitesSelected.length > 0 && sitesSelected.includes(salarie.site.id)) ||
	// 			(search &&
	// 				(salarie.nom.toLocaleLowerCase().includes(search.trim().toLowerCase()) ||
	// 					salarie.prenom.toLocaleLowerCase().includes(search.trim().toLowerCase()) ||
	// 					salarie.email.toLocaleLowerCase().includes(search.trim().toLowerCase()) ||
	// 					salarie.telFixe.toLocaleLowerCase().includes(search.trim().toLowerCase()) ||
	// 					salarie.telPortable.toLocaleLowerCase().includes(search.trim().toLowerCase())))
	// 		);
	// 	});
	// }; // TODO implement the filter

	const removeSalarie = (idSalarie: number) => {
		salaries = salaries.filter((salarie) => salarie.id !== idSalarie);
		filteredSalaries = salaries;
	};
</script>

<section class="list-container">
	{#if data.authed}
		<Button variant="raised">Ajouter un salarie</Button>
	{/if}
	<!-- <div class="filter-container"> -->
	<!-- <Filter
			services={data.services}
			sites={data.sites}
			bind:search
			bind:servicesSelected
			bind:sitesSelected
			{filter}
		/> TODO Intégrer les filtres -->
	<!-- </div> -->
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
					<Cell>Ville</Cell>
					{#if data.authed}
						<Cell>Actions</Cell>
					{/if}
				</Row>
			</Head>
			<Body>
				{#each filteredSalaries as salarie}
					<Salarie
						{salarie}
						authed={data.authed}
						removeSalarie={() => {
							removeSalarie(salarie.id);
						}}
					/>
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
		.salaries-container {
			@include main.flex();

			width: 100%;
		}
	}
</style>
