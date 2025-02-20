<script lang="ts">
	import AdminPage from '$lib/components/AdminPage.svelte';
	import { Salarie, SalariePage, ServicePage } from '$lib/components/index';
	import SitePage from '$lib/components/SitePage.svelte';
	import type { Salarie as SalarieType } from '$lib/models/Salarie.js';
	import type { PageProps } from './$types.js';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import { onMount } from 'svelte';

	let { data }: PageProps = $props();
	let salaries: SalarieType[] = $state(data.salaries);
	let activePage = $state('Salaries');
	let tabs: string[] = $state([]);

	$effect(() => {
		if (data.authed) tabs = ['Salaries', 'Services', 'Sites', 'Admin'];
		else tabs = ['Salaries', 'Services', 'Sites'];
	});
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

	<div class="tab-container">
		<TabBar {tabs} bind:active={activePage}>
			{#snippet tab(tab)}
				<Tab {tab}>
					<Label>{tab}</Label>
				</Tab>
			{/snippet}
		</TabBar>

		{#if activePage === 'Salaries'}
			<SalariePage {data} form></SalariePage>
		{:else if activePage === 'Services'}
			<ServicePage {data} form></ServicePage>
		{:else if activePage === 'Sites'}
			<SitePage {data} form></SitePage>
		{:else if activePage === 'Admin'}
			<AdminPage {data} form></AdminPage>
		{/if}
	</div>
</main>

<style lang="scss">
	@use '$lib/style/main';

	:global(.mdc-data-table) {
		width: 95%;
	}
	main {
		@include main.flex($direction: column, $gap: calc(main.$margin-xl * 3));

		width: 100%;
		padding: main.$margin-m;

		.tab-container {
			@include main.flex($direction: column, $gap: main.$margin-m);

			width: 100%;
		}
	}
</style>
