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
import { checkMercadoPagoAuth, handleMercadoPago } from './utils/handleMercadoPago';

export default {
	async fetch(...params: [Request, Env]): Promise<Response> {
		switch (true) {
			case checkAuth0Auth(...params):
				return await handleAuth0(...params);
			case checkMauticAuth(...params):
				return await handleMautic(...params);
			case checkMercadoPagoAuth(...params):
				return await handleMercadoPago(...params);
			default:
				return new Response('Not recognized request', { status: 400 });
		}
	},
};
