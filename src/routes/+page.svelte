<script lang="ts">
	import Filter from '$lib/components/Filter.svelte';
	import { Salarie, Select } from '$lib/components/index.js';

	let { data } = $props();
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
	<section class="list-container">
		<div class="filter-container">
			<Filter services={data.services} sites={data.sites} />
		</div>
		<div class="salaries-container">
			{#each data.salaries as salarie}
				<Salarie {salarie} />
			{/each}
		</div>
	</section>
</main>

<style lang="scss">
	@use '$lib/style/main';

	main {
		height: 100vh;
	}
</style>
