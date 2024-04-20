import { Env } from '../env';

const AUTH0_AUTH_HEADER = 'Authorization';

export async function handleAuth0(request: Request, env: Env) {
	console.log('HANDLE_AUTH0', request.body);
}

export function checkAuth0Auth(request: Request, env: Env): boolean {
	const headerValue = request.headers.get(AUTH0_AUTH_HEADER);
	return headerValue !== null && headerValue === env.AUTH0_TOKEN;
}
