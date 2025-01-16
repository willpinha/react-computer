import { Stack, TextInput } from "@mantine/core";

export function Hello() {
	return (
		<Stack maw={400}>
			<TextInput label="Full name" />

			<TextInput label="Email" />

			<TextInput label="Contact" />
		</Stack>
	);
}
