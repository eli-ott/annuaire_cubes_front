<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import type { Site } from '$lib/models/Site';
	import { invalidateAll } from '$app/navigation';
	import { verifyObjectFields } from '$lib/Utils/sharedUtils';

	let {
		site = undefined,
		open = false,
		dialogClose
	}: { site: Site | undefined; open: boolean; dialogClose: any } = $props();
	let nom: string | undefined = $state(site?.nom);
	let ville: string | undefined = $state(site?.ville);

	$effect(() => {
		nom = site?.nom;
		ville = site?.ville;
	});

	const doAction = async () => {
		var requiredFields = ['nom', 'ville'];
		let data = {
			nom,
			ville
		};

		let verifyObject = verifyObjectFields(data, requiredFields);
		if (!verifyObject.isValid) {
			alert('Il manque le ' + verifyObject.missingFields.join(', '));
			return;
		}

		if (site) {
			const modifyFetch = await fetch('/api', {
				method: 'put',
				body: JSON.stringify({
					path: 'site',
					data: {
						id: site.id,
						...data
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
					path: 'site',
					data
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

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="site-dialog"
	onSMUIDialogClosed={dialogClose}
>
	<Title id="simple-title">{site ? 'Modifier' : 'Ajouter'} un site</Title>
	<Content id="site-dialog">
		<Textfield
			type="text"
			bind:value={nom}
			input$emptyValueUndefined
			label="Nom"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="text"
			bind:value={ville}
			input$emptyValueUndefined
			label="Ville"
			style="width: 100%"
		></Textfield>
	</Content>
	<Actions>
		<Button onclick={doAction}>
			<Label>{site ? 'Modifier' : 'Ajouter'}</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	@use '$lib/style/main';

	:global(#site-dialog) {
		@include main.flex($direction: column);

		width: 450px;
	}
</style>
