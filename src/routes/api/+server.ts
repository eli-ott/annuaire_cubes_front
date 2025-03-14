import { API_KEY, API_URL } from '$env/static/private';
import { json } from '@sveltejs/kit';

/**
 * Get endpoint to request all the admins
 *
 * @returns
 */
export async function GET({ cookies }) {
	try {
		const postFetch = await fetch(API_URL + 'admin', {
			method: 'GET',
			headers: {
				ApiKey: API_KEY,
				Authorization: 'Bearer ' + cookies.get('token')
			}
		});

		if (postFetch.status === 401) {
			cookies.delete('token', {
				path: '/'
			});
			return json({ data: { message: "Vous n'êtes pas connecté" } }, { status: 401 });
		}

		const postRes = await postFetch.json();

		return json({ data: postRes }, { status: 200 });
	} catch (e) {
		console.log(e);

		return json({ data: e }, { status: 500 });
	}
}

/**
 * Post endpoint to add an element
 *
 * @returns
 */
export async function POST({ cookies, request }) {
	const body = await request.json();

	try {
		const postFetch = await fetch(API_URL + body.path, {
			method: 'POST',
			body: JSON.stringify(body.data),
			headers: {
				ApiKey: API_KEY,
				Authorization: 'Bearer ' + cookies.get('token'),
				'Content-Type': 'application/json'
			}
		});

		if (postFetch.status === 401) {
			cookies.delete('token', {
				path: '/'
			});
			return json({ data: { message: "Vous n'êtes pas connecté" } }, { status: 401 });
		}

		const postRes = await postFetch.json();

		return json({ data: postRes }, { status: 200 });
	} catch (e) {
		console.log(e);

		return json({ data: e }, { status: 500 });
	}
}

/**
 * Put endpoint to modify an element
 *
 * @returns
 */
export async function PUT({ cookies, request }) {
	const body = await request.json();

	try {
		const putFetch = await fetch(API_URL + body.path, {
			method: 'PUT',
			body: JSON.stringify(body.data),
			headers: {
				ApiKey: API_KEY,
				Authorization: 'Bearer ' + cookies.get('token'),
				'Content-Type': 'application/json'
			}
		});

		if (putFetch.status === 401) {
			cookies.delete('token', {
				path: '/'
			});
			return json({ data: { message: "Vous n'êtes pas connecté" } }, { status: 401 });
		}

		const putRes = await putFetch.json();

		return json({ data: putRes }, { status: 200 });
	} catch (e) {
		console.log(e);

		return json({ data: e }, { status: 500 });
	}
}

/**
 * Delete endpoint to delete an element
 *
 * @returns
 */
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
