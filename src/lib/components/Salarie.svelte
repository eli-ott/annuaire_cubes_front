<script lang="ts">
	import type { Salarie } from '$lib/models/Salarie';
	import Card, { Content } from '@smui/card';
	import Chip, { Set, Text } from '@smui/chips';
	import DataTable, { Body, Cell, Head, Row } from '@smui/data-table';

	let { salarie = $bindable() }: { salarie: Salarie } = $props();
</script>

<Row>
	<Cell>{salarie.nom}</Cell>
	<Cell>{salarie.prenom}</Cell>
	<Cell>{salarie.telPortable}</Cell>
	<Cell>{salarie.telFixe}</Cell>
	<Cell>{salarie.email}</Cell>
	<Cell>{salarie.service.nom}</Cell>
	<Cell>{salarie.site.nom}</Cell>
</Row>

<style lang="scss">
	@use '$lib/style/main';

	:global(.mdc-card) {
		@include main.flex($direction: row);
		width: 90%;

		.smui-card__content {
			width: 100%;

			h2 {
				margin-bottom: main.$margin-m;
				text-decoration: underline;
			}
			span,
			div {
				@include main.flex($direction: row);
			}
		}
	}
</style>
