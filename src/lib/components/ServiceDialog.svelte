<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import type { Service } from '$lib/models/Service';
	import { invalidateAll } from '$app/navigation';

	let {
		service = undefined,
		open = false,
		dialogClose
	}: { service: Service | undefined; open: boolean; dialogClose: any } = $props();
	let nom: string | undefined = $state(service?.nom);

	$effect(() => {
		nom = service?.nom;
	});

	const doAction = async () => {
		if (service) {
			const modifyFetch = await fetch('/api', {
				method: 'put',
				body: JSON.stringify({
					path: 'service',
					data: {
						id: service.id,
						nom
					}
				})
			});

			const res = await modifyFetch.json();

			if (res.data.status === 200) {
				invalidateAll();
			} else {
				alert(res.data.message);
			}
		} else {
			const modifyFetch = await fetch('/api', {
				method: 'post',
				body: JSON.stringify({
					path: 'service',
					data: {
						nom
					}
				})
			});

			const res = await modifyFetch.json();

			if (res.data.status === 200) {
				invalidateAll();
			} else {
				alert(res.data.message);
			}
		}
	};
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="service-dialog">
	<Title id="simple-title">{service ? 'Modifier' : 'Ajouter'} un service</Title>
	<Content id="service-dialog">
		<Textfield
			type="text"
			bind:value={nom}
			input$emptyValueUndefined
			label="Nom"
			style="width: 100%"
		></Textfield>
	</Content>
	<Actions>
		<Button onclick={doAction}>
			<Label>{service ? 'Modifier' : 'Ajouter'}</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	@use '$lib/style/main';

	:global(#service-dialog) {
		@include main.flex($direction: column);

		width: 450px;
	}
</style>
