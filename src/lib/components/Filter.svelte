<script lang="ts">
	import type { Service } from '$lib/models/Service';
	import type { Site } from '$lib/models/Site';

	let { services = $bindable(), sites = $bindable() }: { services: Service[]; sites: Site[] } =
		$props();
	let sitesSelected = $state([]);
</script>

<aside class="filter">
	<div class="filter-section services-container">
		<p class="filter-title">Services</p>
		<div class="options-container">
			{#each services as service, index}
				<div class="service">
					<label for="service-{index}">
						<input type="checkbox" name="services" id="service-{index}" />
						<div class="checkbox-container"></div>
						{service.nom}
					</label>
				</div>
			{/each}
		</div>
	</div>
	<div class="filter-section sites-container">
		<p class="filter-title">Sites</p>
		<div class="options-container">
			{#each sites as site, index}
				<div class="site">
					<label for="site-{index}">
						<input type="checkbox" name="sites" id="site-{index}" />
						<div class="checkbox-container"></div>
						{site.nom}
						{site.ville}
					</label>
				</div>
			{/each}
		</div>
	</div>
	<button>Appliquer les filtres</button>
</aside>

<style lang="scss">
	@use '$lib/style/main';

	aside {
		@include main.flex($direction: column, $justify: start, $align: start, $gap: main.$margin-l);
		position: sticky;

		top: 0;
		left: 0;
		width: 350px;
		height: 100vh;

		.filter-section {
			@include main.flex($direction: column, $justify: start, $align: start, $gap: main.$margin-s);

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

				label {
					position: relative;

					input {
						visibility: hidden;

						height: 15px;
						width: 15px;

						&:hover ~ .checkbox-container {
							background: rgba(255, 255, 255, 0.587);
						}
						&:checked ~ .checkbox-container {
							background: main.$blue;
						}
					}
					.checkbox-container {
						@include main.flex();
						content: '\A0';
						position: absolute;

						height: 15px;
						width: 15px;
						left: 0;
						top: 0;

						border: solid 1px main.$light;
					}
				}
			}
		}
	}
</style>
