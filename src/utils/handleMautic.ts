import { Env } from '../env';

const MAUTIC_AUTH_HEADER = 'Webhook-Signature';

export async function handleMautic(request: Request) {
	console.log('HANDLE_MAUTIC', request.body);
}

export function checkMauticAuth(request: Request, env: Env): boolean {
	const headerValue = request.headers.get(MAUTIC_AUTH_HEADER);
	return headerValue !== null && headerValue === env.MAUTIC_SECRET;
}
