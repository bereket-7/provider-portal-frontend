export async function demoDelay(ms = 400): Promise<void> {
	await new Promise((resolve) => setTimeout(resolve, ms));
}
