<script lang="ts">
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Service from './Service.svelte';
	import ServiceDialog from './ServiceDialog.svelte';

	let { data }: PageProps = $props();
	let dialogOpen = $state(false);
</script>

<ServiceDialog open={dialogOpen} service={undefined} dialogClose={() => (dialogOpen = false)}
></ServiceDialog>
<section class="list-container">
	{#if data.authed}
		<Button variant="raised" onclick={() => (dialogOpen = true)}>Ajouter un service</Button>
	{/if}
	<div class="services-container">
		<DataTable table$aria-label="Services">
			<Head>
				<Row>
					<Cell>Id</Cell>
					<Cell>Nom</Cell>
					{#if data.authed}
						<Cell>Actions</Cell>
					{/if}
				</Row>
			</Head>
			<Body>
				{#each data.services as service}
					<Service {service} authed={data.authed} />
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

		.services-container {
			@include main.flex();

			width: 100%;
		}
	}
</style>
