import {
	ActionIcon,
	Anchor,
	Button,
	Container,
	Divider,
	Group,
	Stack,
	Text,
	TextInput,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconBrandGoogleFilled, IconMeteor } from "@tabler/icons-react";

export function Index() {
	return (
		<Container maw={400}>
			<Stack gap="xl">
				<ActionIcon variant="default" size="xl">
					<IconMeteor />
				</ActionIcon>

				<Title order={3}>Sign in</Title>

				<Button variant="default" size="lg" justify="start">
					<Group>
						<ThemeIcon color="red" radius="xl" size="sm">
							<IconBrandGoogleFilled />
						</ThemeIcon>
						<Text size="sm" fw="bolder">
							Continue with Google
						</Text>
					</Group>
				</Button>

				<Divider label="OR" />

				<TextInput size="lg" type="email" label="Email address" />

				<Button color="violet" size="lg">
					Continue
				</Button>

				<Group gap="xs">
					<Text>No account?</Text>
					<Anchor c="violet">Sign up</Anchor>
				</Group>
			</Stack>
		</Container>
	);
}
