/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Env } from './env';
import { checkAuth0Auth, handleAuth0 } from './utils/handleAuth0';
import { checkMauticAuth, handleMautic } from './utils/handleMautic';
import { checkMercadoPagoAuth, handleMercadoPago } from './utils/handleMercadoPado';

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const isAuth0 = checkAuth0Auth(request, env);
		const isMautic = checkMauticAuth(request, env);
		const isMercadoPago = checkMercadoPagoAuth(request, env);
		console.log('CHECK', { isAuth0, isMautic, isMercadoPago });
		if (!isAuth0 && !isMautic && !isMercadoPago) return new Response('Not recognized request', { status: 400 });

		isAuth0 && (await handleAuth0(request));
		isMautic && (await handleMautic(request));
		isMercadoPago && (await handleMercadoPago(request, env));

		return new Response('Hello World!');
	},
};
