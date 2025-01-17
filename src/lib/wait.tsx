export async function wait(miliseconds: number) {
	return await new Promise((resolve) => setTimeout(resolve, miliseconds));
}
