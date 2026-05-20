/** Optional artificial delay for demo API calls. Defaults to 0 for production/Vercel. */
function getDemoDelayMs(override?: number): number {
	if (override !== undefined) return Math.max(0, override);
	const fromEnv = process.env.NEXT_PUBLIC_DEMO_DELAY_MS;
	if (fromEnv === undefined || fromEnv === "") return 0;
	const parsed = Number(fromEnv);
	return Number.isFinite(parsed) ? Math.max(0, parsed) : 0;
}

export async function demoDelay(ms?: number): Promise<void> {
	const delay = getDemoDelayMs(ms);
	if (delay <= 0) return;
	await new Promise((resolve) => setTimeout(resolve, delay));
}
