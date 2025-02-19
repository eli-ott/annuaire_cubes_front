<script lang="ts">
	import type { Service } from '$lib/models/Service';
	import type { Site } from '$lib/models/Site';
	import TextField from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import FormField from '@smui/form-field';
	import Button, { Label } from '@smui/button';

	let {
		services,
		sites,
		filter,
		sitesSelected = $bindable(),
		servicesSelected = $bindable(),
		search = $bindable()
	}: {
		services: Service[];
		sites: Site[];
		filter: any;
		sitesSelected: number[];
		servicesSelected: number[];
		search: string | undefined;
	} = $props();
</script>

<aside>
	<h6>Filtres</h6>
	<div class="filters-container">
		<div class="filter-section search-container">
			<p class="filter-title">Recherche</p>
			<TextField
				type="email"
				bind:value={search}
				label="Recherche"
				input$width="100"
				style="width: 100%"
				input$emptyValueUndefined
			></TextField>
		</div>
		<div class="filter-section services-container">
			<p class="filter-title">Services</p>
			<div class="options-container">
				{#each services as service, index}
					<FormField>
						<Checkbox input$id="service-{index}" bind:group={servicesSelected} value={service.id}
						></Checkbox>
						<label for="service-{index}">{service.nom}</label>
					</FormField>
				{/each}
			</div>
		</div>
		<div class="filter-section sites-container">
			<p class="filter-title">Sites</p>
			<div class="options-container">
				{#each sites as site, index}
					<FormField>
						<Checkbox input$id="site-{index}" bind:group={sitesSelected} value={site.id}></Checkbox>
						<label for="site-{index}">{site.nom} ({site.ville})</label>
					</FormField>
				{/each}
			</div>
		</div>
	</div>
	<Button variant="unelevated" onclick={filter}>
		<Label>Appliquer les filtres</Label>
	</Button>
</aside>

<style lang="scss">
	@use '$lib/style/main';

	:global(.mdc-form-field) {
		@include main.flex();
	}
	aside {
		@include main.flex(
			$direction: column,
			$justify: start,
			$align: start,
			$gap: main.$margin-l,
			$wrap: nowrap
		);
		position: sticky;

		top: 0;
		left: 0;
		width: 100%;

		h6 {
			font-size: 23px;
			text-decoration: underline;
		}

		.filters-container {
			@include main.flex($justify: start, $align: start);

			width: 100%;

			.filter-section {
				@include main.flex(
					$direction: column,
					$justify: start,
					$align: start,
					$gap: main.$margin-s
				);

				width: 100%;

				.filter-title {
					font-size: 19px;
				}

				.options-container {
					@include main.flex(
						$direction: column,
						$justify: start,
						$align: start,
						$gap: main.$margin-xs
					);
				}
			}
		}
	}
</style>
