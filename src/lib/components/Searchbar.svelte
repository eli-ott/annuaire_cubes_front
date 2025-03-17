<script lang="ts">
	import Textfield from '@smui/textfield';
	import Select, { Option } from '@smui/select';
	import type { Service } from '$lib/models/Service';
	import type { Site } from '$lib/models/Site';
	import Button from '@smui/button';

	let {
		search = $bindable(),
		searchedSite = $bindable(),
		searchedService = $bindable(),
		sites,
		services,
		onSearch
	}: {
		search: string | undefined;
		searchedSite: number | undefined;
		searchedService: number | undefined;
		sites: Site[];
		services: Service[];
		onSearch: () => void;
	} = $props();
</script>

<div class="searchbar">
	<Textfield
		type="text"
		bind:value={search}
		input$emptyValueUndefined
		label="Recherche"
		style="width: 350px"
	></Textfield>
	<Select bind:value={searchedService} label={!searchedService ? 'Service' : ''} style="width: 150px">
		<Option value={-1}>Tous</Option>
		{#each services as service}
			<Option value={service.id}>{service.nom}</Option>
		{/each}
	</Select>
	<Select bind:value={searchedSite} label={!searchedSite ? 'Site' : ''} style="width: 150px">
		<Option value={-1}>Tous</Option>
		{#each sites as site}
			<Option value={site.id}>{site.nom} ({site.ville})</Option>
		{/each}
	</Select>
	<Button variant="unelevated" onclick={onSearch}>Rechercher</Button>
</div>

<style lang="scss">
	@use '$lib/style/main.scss';

	.searchbar {
		@include main.flex($direction: row, $gap: main.$margin-m, $wrap: wrap);

		width: 100%;
	}
</style>
