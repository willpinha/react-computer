import {
	Button,
	Paper,
	PasswordInput,
	Stack,
	TextInput,
	Title,
} from "@mantine/core";

export function Hello() {
	return (
		<Paper p="md" maw={400}>
			<Stack>
				<Title order={4}>Login</Title>
				<TextInput label="Username" />
				<PasswordInput label="Password" />
				<Button>Login</Button>
			</Stack>
		</Paper>
	);
}
