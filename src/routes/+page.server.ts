import { API_KEY, API_URL } from '$env/static/private';
import type { Salarie } from '$lib/models/Salarie';
import type { Service } from '$lib/models/Service';
import type { Site } from '$lib/models/Site';
import type { PageServerLoad } from './$types';

const getServices = async (): Promise<Service[]> => {
	const services = await fetch(API_URL + 'service', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const res = await services.json();

	return res.data;
};

const getSites = async (): Promise<Site[]> => {
	const sites = await fetch(API_URL + 'site', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const res = await sites.json();

	return res.data;
};

const getSalaries = async (): Promise<Salarie[]> => {
	const salaries = await fetch(API_URL + 'salarie', {
		headers: {
			ApiKey: API_KEY
		}
	});
	const res = await salaries.json();

	return res.data;
};

export const load: PageServerLoad = async () => {
	return {
		services: await getServices(),
		sites: await getSites(),
		salaries: await getSalaries()
	};
};
