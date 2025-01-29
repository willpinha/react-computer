import {
	Button,
	Container,
	Paper,
	Stack,
	Textarea,
	TextInput,
	Title,
} from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<Paper withBorder p="md">
				<Stack>
					<Title>Contact us</Title>

					<TextInput label="Name" />

					<TextInput label="Email" />

					<Textarea label="Message" />

					<Button>Send</Button>
				</Stack>
			</Paper>
		</Container>
	);
}
