import { Container, TextInput } from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<TextInput
				label="Label"
				error="Error message"
				placeholder="Type something here"
			/>
		</Container>
	);
}
