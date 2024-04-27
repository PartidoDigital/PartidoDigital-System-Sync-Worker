import { Env } from '../env';

const MAUTIC_AUTH_HEADER = 'Webhook-Signature';

export async function handleMautic(request: Request, env: Env): Promise<Response> {
	console.log('HANDLE_MAUTIC', request.body);
	return new Response('Ok');
}

export function checkMauticAuth(request: Request, env: Env): boolean {
	const headerValue = request.headers.get(MAUTIC_AUTH_HEADER);
	return headerValue !== null && headerValue === env.MAUTIC_SECRET;
}
