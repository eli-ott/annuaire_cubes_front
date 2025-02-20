<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import type { Service } from '$lib/models/Service';
	import type { Salarie } from '$lib/models/Salarie';
	import { invalidateAll } from '$app/navigation';
	import Select, { Option } from '@smui/select';

	let {
		open = false,
		dialogClose,
		salaries,
        update
	}: { open: boolean; dialogClose: any; salaries: Salarie[], update: any } = $props();
	let idUser: number | undefined = $state();

	const doAction = async () => {
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

		if (res.data.status === 200) {
			update();
		} else {
			alert(res.data.message);
		}
	};
</script>

<Dialog bind:open aria-labelledby="simple-title" aria-describedby="service-dialog">
	<Title id="simple-title">Ajouter un admin</Title>
	<Content id="service-dialog">
		<Select bind:value={idUser} label="Select Menu" style="width: 100%">
			{#each salaries as salarie}
				<Option value={salarie.id}>{salarie.nom} {salarie.prenom}</Option>
			{/each}
		</Select>
	</Content>
	<Actions>
		<Button onclick={doAction}>
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
