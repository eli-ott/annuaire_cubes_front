import { API_KEY, API_URL } from '$env/static/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const services = await fetch(API_URL + 'service', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const servicesRes = await services.json();

	const sites = await fetch(API_URL + 'site', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const sitesRes = await sites.json();

	const salaries = await fetch(API_URL + 'salarie', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const salariesRes = await salaries.json();

	return {
		services: servicesRes.data,
		sites: sitesRes.data,
		salaries: salariesRes.data,
		authed: cookies.get('token') ? true : false
	};
};
