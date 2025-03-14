<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import type { Salarie } from '$lib/models/Salarie';
	import Select, { Option } from '@smui/select';
	import { verifyObjectFields } from '$lib/Utils/sharedUtils';

	let {
		open = false,
		dialogClose,
		salaries,
		update
	}: { open: boolean; dialogClose: any; salaries: Salarie[]; update: any } = $props();
	let idUser: number | undefined = $state();

	/**
	 * Add an admin
	 */
	const addAdmin = async () => {
		var requiredFields = ['idUser'];
		let data = {
			idUser
		};

		let verifyObject = verifyObjectFields(data, requiredFields);
		if (!verifyObject.isValid) {
			alert('Il manque le ' + verifyObject.missingFields.join(', '));
			return;
		}

		const modifyFetch = await fetch('/api', {
			method: 'post',
			body: JSON.stringify({
				path: 'admin',
				data: {
					idUser
				}
			})
		});
		const res = await modifyFetch.json();

		if (!modifyFetch.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		update();
	};
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="service-dialog"
	onSMUIDialogClosed={dialogClose}
>
	<Title id="simple-title">Ajouter un admin</Title>
	<Content id="service-dialog">
		<Select bind:value={idUser} label={!idUser ? 'Salarie' : ''} style="width: 100%">
			{#each salaries as salarie}
				<Option value={salarie.id}>{salarie.nom} {salarie.prenom}</Option>
			{/each}
		</Select>
	</Content>
	<Actions>
		<Button onclick={addAdmin}>
			<Label>Ajouter</Label>
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
