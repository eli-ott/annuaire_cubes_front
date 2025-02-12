import { API_KEY, API_URL } from '$env/static/private';
import type { Salarie } from '$lib/components';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }): Promise<Salarie> => {
	const salarieId = parseInt(params.id);

	let res;
	try {
		const salarie = await fetch(API_URL + 'salarie/' + salarieId, {
			method: 'GET',
			headers: {
				ApiKey: API_KEY
			}
		});
		res = await salarie.json();
	} catch (e) {
		console.error(e);
	}

	return res.data;
};
