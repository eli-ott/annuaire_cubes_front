<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';

	let { open = false, dialogClose }: { open: boolean; dialogClose: any } = $props();
	let telPortable: string | undefined = $state();
	let password: string | undefined = $state();

	/**
	 * Execute a login
	 */
	const logUser = async () => {
		const authFetch = await fetch('/api/auth', {
			method: 'post',
			body: JSON.stringify({
				path: 'site',
				data: {
					telPortable,
					password
				}
			})
		});
		const res = await authFetch.json();

		if (!authFetch.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		// Refresh de la page pour activer les droits correctement
		window.location.reload();
	};
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="site-dialog"
	onSMUIDialogClosed={dialogClose}
>
	<Title id="simple-title">Se connecter</Title>
	<Content id="site-dialog">
		<Textfield
			type="text"
			bind:value={telPortable}
			input$emptyValueUndefined
			label="Tel Portable"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="password"
			bind:value={password}
			input$emptyValueUndefined
			label="Mot de passe"
			style="width: 100%"
		></Textfield>
	</Content>
	<Actions>
		<Button onclick={logUser}>
			<Label>Valider</Label>
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
