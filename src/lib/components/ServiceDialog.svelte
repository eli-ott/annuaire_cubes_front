<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import type { Service } from '$lib/models/Service';
	import { invalidateAll } from '$app/navigation';
	import { verifyObjectFields } from '$lib/Utils/sharedUtils';

	let {
		service = undefined,
		open = false,
		dialogClose
	}: { service: Service | undefined; open: boolean; dialogClose: any } = $props();
	let nom: string | undefined = $state(service?.nom);

	/**
	 * Effect
	 * Modify the fields when they are modified
	 */
	$effect(() => {
		nom = service?.nom;
	});

	/**
	 * Execute an action
	 * Either update or add a service
	 */
	const doAction = async () => {
		var requiredFields = ['nom'];
		let data = {
			nom
		};

		let verifyObject = verifyObjectFields(data, requiredFields);
		if (!verifyObject.isValid) {
			alert('Il manque le ' + verifyObject.missingFields.join(', '));
			return;
		}

		const method = service ? 'put' : 'post';
		const requestData = service
			? { path: 'service', data: { id: service.id, ...data } }
			: { path: 'service', data };

		const response = await fetch('/api', {
			method,
			body: JSON.stringify(requestData)
		});
		const res = await response.json();

		if (!response.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		invalidateAll();
	};
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="service-dialog"
	onSMUIDialogClosed={dialogClose}
>
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
