<script lang="ts">
	import { Salarie } from '$lib/components/index';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Button from '@smui/button';
	import SalarieDialog from './SalarieDialog.svelte';
	import type { Salarie as SalarieType } from '$lib/models/Salarie';
	import Searchbar from './Searchbar.svelte';

	let { data }: PageProps = $props();
	let dialogOpen = $state(false);
	let selectedSalarie: SalarieType | undefined = $state();
	let filteredSalaries: SalarieType[] = $state([]);
	let searchedSite: number | undefined = $state(-1);
	let searchedService: number | undefined = $state(-1);
	let search: string | undefined = $state();

	/**
	 * Manage the search in all the salaries
	 */
	const handleSearch = () => {
		filteredSalaries = [];

		data.salaries.forEach((salarie: SalarieType) => {
			if (
				(!searchedSite || searchedSite === -1) &&
				(!searchedService || searchedService === -1) &&
				!search
			) {
				filteredSalaries = data.salaries;
			}
			if (
				salarie.service.id === searchedService ||
				salarie.site.id === searchedSite ||
				(salarie &&
					search &&
					(salarie.nom.includes(search) ||
						salarie.prenom.includes(search) ||
						salarie.email.includes(search) ||
						salarie.telFixe.includes(search) ||
						salarie.telPortable.includes(search)))
			) {
				filteredSalaries.push(salarie);
			}
		});

		filteredSalaries = [...filteredSalaries];
	};
	handleSearch();

	/**
	 * Handle a salarie creation
	 */
	const handleNew = () => {
		selectedSalarie = undefined;
		dialogOpen = true;
	};

	/**
	 * Handle a salarie update
	 *
	 * @param {SalarieType} salarie The salarie to update
	 */
	const handleModify = (salarie: SalarieType) => {
		selectedSalarie = salarie;
		dialogOpen = true;
	};
</script>

<SalarieDialog
	open={dialogOpen}
	salarie={selectedSalarie}
	servicesList={data.services}
	sitesList={data.sites}
	dialogClose={() => (dialogOpen = false)}
></SalarieDialog>

<section class="list-container">
	{#if data.authed}
		<Button variant="raised" onclick={handleNew}>Ajouter un salarie</Button>
	{/if}

	<Searchbar
		onSearch={handleSearch}
		services={data.services}
		bind:search
		sites={data.sites}
		bind:searchedSite
		bind:searchedService
	/>

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
						handleModify={() => {
							handleModify(salarie);
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
