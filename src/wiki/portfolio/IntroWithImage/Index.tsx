import {
	Button,
	Container,
	Group,
	Image,
	Stack,
	Text,
	Title,
} from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="sm">
			<Group justify="space-between" wrap="nowrap" gap="xl">
				<Stack>
					<Title>Your name here</Title>
					<Text c="dimmed">
						A simple description about you, your work, your
						projects, or anything else you want to share
					</Text>
					<Group>
						<Button rightSection={<IconChevronRight />} size="lg">
							Contact me
						</Button>
					</Group>
				</Stack>

				<Image src="/images/avatar.svg" w={250} />
			</Group>
		</Container>
	);
}
