<script lang="ts">
	import AdminPage from '$lib/components/AdminPage.svelte';
	import AuthDialog from '$lib/components/AuthDialog.svelte';
	import { SalariePage, ServicePage } from '$lib/components/index';
	import SitePage from '$lib/components/SitePage.svelte';
	import type { Salarie as SalarieType } from '$lib/models/Salarie.js';
	import type { PageProps } from './$types.js';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	let { data }: PageProps = $props();
	let salaries: SalarieType[] = $state(data.salaries);
	let activePage = $state('Salaries');
	let tabs: string[] = $state([]);
	
	let dialogOpen = $state(false);

	$effect(() => {
		if (data.authed) tabs = ['Salaries', 'Services', 'Sites', 'Admin'];
		else tabs = ['Salaries', 'Services', 'Sites'];
	});

	const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowLeft'];
	let currentIndex = 0;

	const handleSequence = (event: KeyboardEvent) => {
		if (event.key === sequence[currentIndex]) {
			currentIndex++;
			if (currentIndex === sequence.length) {
				dialogOpen = true;
				currentIndex = 0;
			}
		} else {
			currentIndex = 0;
		}
	};
</script>

<svelte:window onkeydown={handleSequence}></svelte:window>
<AuthDialog open={dialogOpen} dialogClose={() => dialogOpen = false}></AuthDialog>
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
