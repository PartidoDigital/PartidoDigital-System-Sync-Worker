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
		checkAuth0Auth(...params) && (await handleAuth0(...params));
		checkMauticAuth(...params) && (await handleMautic(...params));
		checkMercadoPagoAuth(...params) && (await handleMercadoPago(...params));
		return new Response('Not recognized request', { status: 400 });
	},
};
