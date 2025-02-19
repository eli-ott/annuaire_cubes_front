import { API_KEY, API_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function DELETE({ cookies, request }) {
	const body = await request.json();

	try {
		const delFetch = await fetch(API_URL + body.path + '/' + body.id, {
			method: 'DELETE',
			headers: {
				ApiKey: API_KEY,
				Authorization: 'Bearer ' + cookies.get('token')
			}
		});

		if (delFetch.status === 401) {
			cookies.delete('token', {
				path: '/'
			});
			return json({ data: { message: "Vous n'êtes pas connecté" } }, { status: 401 });
		}

		const delRes = await delFetch.json();

		return json({ data: delRes }, { status: 200 });
	} catch (e) {
		console.log(e);

		return json({ data: e }, { status: 500 });
	}
}
