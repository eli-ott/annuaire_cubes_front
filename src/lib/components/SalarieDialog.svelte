<script lang="ts">
	import Dialog, { Title, Content, Actions } from '@smui/dialog';
	import Button, { Label } from '@smui/button';
	import Textfield from '@smui/textfield';
	import type { Salarie } from '$lib/models/Salarie';
	import { invalidateAll } from '$app/navigation';
	import type { Service } from '$lib/models/Service';
	import type { Site } from '$lib/models/Site';
	import Select, { Option } from '@smui/select';
	import { verifyObjectFields } from '$lib/Utils/sharedUtils';

	let {
		salarie = undefined,
		servicesList,
		sitesList,
		open = false,
		dialogClose
	}: {
		salarie: Salarie | undefined;
		servicesList: Service[];
		sitesList: Site[];
		open: boolean;
		dialogClose: any;
	} = $props();

	/** The salarie first name */
	let nom: string | undefined = $state(salarie?.nom);
	/** The salarie last name */
	let prenom: string | undefined = $state(salarie?.prenom);
	/** The salarie fixed phone line */
	let telFixe: string | undefined = $state(salarie?.telFixe);
	/** The salarie mobile phone */
	let telPortable: string | undefined = $state(salarie?.telPortable);
	/** The salarie email */
	let email: string | undefined = $state(salarie?.email);
	/** The salarie service */
	let service: number | undefined = $state(salarie?.service.id);
	/** The salarie site */
	let site: number | undefined = $state(salarie?.site.id);

	/**
	 * Effect
	 *
	 * Updates the fields of the salaries when they are modified
	 */
	$effect(() => {
		nom = salarie?.nom;
		prenom = salarie?.prenom;
		telFixe = salarie?.telFixe;
		telPortable = salarie?.telPortable;
		email = salarie?.email;
		service = salarie?.service.id;
		site = salarie?.site.id;
	});

	/**
	 * Execute an action
	 * Either modify of add
	 */
	const doAction = async () => {
		var requiredFields = ['nom', 'prenom', 'telFixe', 'telPortable', 'email', 'service', 'site'];
		let data = {
			nom,
			prenom,
			telFixe,
			telPortable,
			email,
			service: servicesList.find((s) => s.id === service),
			site: sitesList.find((s) => s.id === site)
		};

		let verifyObject = verifyObjectFields(data, requiredFields);
		if (!verifyObject.isValid) {
			alert('Il manque le ' + verifyObject.missingFields.join(', '));
			return;
		}

		const method = salarie ? 'put' : 'post';
		const requestData = salarie
			? { path: 'salarie', data: { id: salarie.id, ...data } }
			: { path: 'salarie', data };

		const response = await fetch('/api', {
			method,
			body: JSON.stringify(requestData)
		});
		const res = await response.json();

		if (!response.ok || res.data.status !== 200) {
			alert(res.data.message ?? 'Une erreur est survenue');
			return;
		}

		document.location.reload();
		invalidateAll();
	};
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="salarie-dialog"
	onSMUIDialogClosed={dialogClose}
>
	<Title id="simple-title">{salarie ? 'Modifier' : 'Ajouter'} un salarie</Title>
	<Content id="salarie-dialog">
		<Textfield
			type="text"
			bind:value={nom}
			input$emptyValueUndefined
			label="Nom"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="text"
			bind:value={prenom}
			input$emptyValueUndefined
			label="Prénom"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="text"
			bind:value={telFixe}
			input$emptyValueUndefined
			label="Tel. Fixe"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="text"
			bind:value={telPortable}
			input$emptyValueUndefined
			label="Tel Portable"
			style="width: 100%"
		></Textfield>
		<Textfield
			type="email"
			bind:value={email}
			input$emptyValueUndefined
			label="Email"
			style="width: 100%"
		></Textfield>
		<Select bind:value={service} label={!service ? 'Service' : ''} style="width: 100%">
			{#each servicesList as service}
				<Option value={service.id}>{service.nom}</Option>
			{/each}
		</Select>
		<Select bind:value={site} label={!site ? 'Site' : ''} style="width: 100%">
			{#each sitesList as site}
				<Option value={site.id}>{site.nom} ({site.ville})</Option>
			{/each}
		</Select>
	</Content>
	<Actions>
		<Button onclick={doAction}>
			<Label>{salarie ? 'Modifier' : 'Ajouter'}</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	@use '$lib/style/main';

	:global(#salarie-dialog) {
		@include main.flex($direction: column);

		width: 450px;
	}
</style>
