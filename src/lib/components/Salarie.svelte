<script lang="ts">
	import type { Salarie } from '$lib/models/Salarie';

	let { salarie = $bindable() }: { salarie: Salarie } = $props();
</script>

<div class="salarie">
	<h6>
		{salarie.nom}
		{salarie.prenom}
	</h6>
	<p>
		Service: {salarie.service.nom}
		Site: {salarie.site.nom} - {salarie.site.ville}
	</p>
	<a href="salarie/{salarie.id}"> Afficher ses infos </a>
</div>
