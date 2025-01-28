import { Container, TextInput } from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<TextInput
				label="Label"
				description="This is a description"
				placeholder="Placeholder"
			/>
		</Container>
	);
}
