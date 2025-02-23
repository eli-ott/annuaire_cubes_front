import { API_KEY, API_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

export async function POST({ cookies, request }) {
	const body = await request.json();

	try {
		const postFetch = await fetch(API_URL + 'auth/login', {
			method: 'POST',
			body: JSON.stringify(body.data),
			headers: {
				ApiKey: API_KEY,
				Authorization: 'Bearer ' + cookies.get('token'),
				'Content-Type': 'application/json'
			}
		});

		const postRes = await postFetch.json();

		if (postRes.status === 200) {
			cookies.set('token', postRes.data, {
				path: '/',
				expires: new Date(new Date().getTime() + 60 * 60 * 1000)
			});
		}

		return json({ data: postRes }, { status: 200 });
	} catch (e) {
		console.log(e);

		return json({ data: e }, { status: 500 });
	}
}

export function DELETE({ cookies }) {
	cookies.delete('token', {
		path: '/'
	});

	return json({ data: { message: 'Vous êtes déconnecté' } }, { status: 200 });
}
