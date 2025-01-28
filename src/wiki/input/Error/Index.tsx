import { Container, TextInput } from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<TextInput error="This is an error" placeholder="Placeholder" />
		</Container>
	);
}
