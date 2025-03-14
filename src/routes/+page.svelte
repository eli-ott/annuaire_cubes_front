<script lang="ts">
	import AdminPage from '$lib/components/AdminPage.svelte';
	import AuthDialog from '$lib/components/AuthDialog.svelte';
	import { SalariePage, ServicePage } from '$lib/components/index';
	import SitePage from '$lib/components/SitePage.svelte';
	import type { Salarie as SalarieType } from '$lib/models/Salarie.js';
	import Button from '@smui/button';
	import type { PageProps } from './$types.js';
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';

	let { data }: PageProps = $props();
	let activePage = $state('Salaries');
	let tabs: string[] = $state([]);

	let dialogOpen = $state(false);

	$effect(() => {
		if (data.authed) tabs = ['Salaries', 'Services', 'Sites', 'Admin'];
		else tabs = ['Salaries', 'Services', 'Sites'];
	});

	const sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'Enter'];
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

	const handleDisconnect = async () => {
		const disconnectFetch = await fetch('/api/auth', {
			method: 'DELETE'
		});

		if (disconnectFetch.status === 200) {
			window.location.reload();
		}
	};
</script>

<svelte:window onkeydown={handleSequence} />
<AuthDialog open={dialogOpen} dialogClose={() => (dialogOpen = false)}></AuthDialog>
<main>
	<div class="header">
		<h1>Annuaire interne</h1>
		{#if data.authed}
			<Button variant="unelevated" onclick={handleDisconnect}>Se déconnecter</Button>
		{/if}
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
		@include main.flex($direction: column, $gap: main.$margin-m);

		width: 100%;
		padding: main.$margin-m;

		.header {
			@include main.flex($justify: space-between);

			width: 100%;
		}

		.tab-container {
			@include main.flex($direction: column, $gap: main.$margin-m);

			width: 100%;
		}
	}
</style>
