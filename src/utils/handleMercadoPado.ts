import { Env } from '../env';
import { createHmac } from 'node:crypto';

const MERCADO_PAGO_AUTH_HEADER = 'x-signature';
const MERCADO_PAGO_REQUEST_ID_HEADER = 'x-request-id';

export async function handleMercadoPago(request: Request, env: Env) {
	const body = await request.json();
	console.log('HANDLE_MERCADO_PAGO', body);
	const response = await fetch(`https://api.mercadopago.com/authorized_payments/${body.id}`, {
		headers: {
			Authorization: `Bearer ${env.MERCADO_PAGO_ACCESS_TOKEN}`,
		},
	});
	console.log('RESPONSE', await response.json());
}

export function checkMercadoPagoAuth(request: Request, env: Env): boolean {
	const headerValue = request.headers.get(MERCADO_PAGO_AUTH_HEADER);
	const requestValue = request.headers.get(MERCADO_PAGO_REQUEST_ID_HEADER);
	if (!headerValue) return false;
	const { searchParams } = new URL(request.url);
	const params = new URLSearchParams(headerValue.replace(',', '&'));
	const dataId = searchParams.get('data.id') ? `id:${searchParams.get('data.id')};` : '';
	const manifest = `${dataId}${requestValue ? `request-id:${requestValue};` : ''}ts:${params.get('ts')};`;
	const hmac = createHmac('sha256', env.MERCADO_PAGO_SECRET_KEY);
	const firmaEsperada = hmac.update(manifest).digest('hex');
	return firmaEsperada === params.get('v1');
}
