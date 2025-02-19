<script lang="ts">
	import Button from '@smui/button';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';
	import type { PageProps } from '../../routes/$types';
	import Service from './Service.svelte';
	import type { Service as ServiceType } from '$lib/models/Service';

	let { data }: PageProps = $props();
	let services = $state(data.services);

	const removeService = (idService: number) => {
		services = services.filter((service: ServiceType) => service.id !== idService);
	};
</script>

<section class="list-container">
	<Button variant="raised">Ajouter un service</Button>
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
				{#each services as service}
					<Service
						{service}
						authed={data.authed}
						removeService={() => {
							removeService(service.id);
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

		.services-container {
			@include main.flex();

			width: 100%;
		}
	}
</style>
