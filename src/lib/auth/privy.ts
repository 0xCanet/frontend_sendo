import { PrivyClient } from '@privy-io/node';

let privyInstance: PrivyClient | null = null;

function getPrivyClient(): PrivyClient {
	if (!privyInstance) {
		const appId = process.env.PRIVY_APP_ID;
		const appSecret = process.env.PRIVY_APP_SECRET;
		if (!appId || !appSecret) {
			throw new Error('PRIVY_APP_ID and PRIVY_APP_SECRET are required');
		}
		privyInstance = new PrivyClient({
			appId,
			appSecret,
		});
	}
	return privyInstance;
}

const privy = new Proxy({} as PrivyClient, {
	get(target, prop, receiver) {
		const client = getPrivyClient();
		return Reflect.get(client, prop, receiver);
	},
});

export default privy;

