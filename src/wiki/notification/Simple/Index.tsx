import { Container, Notification } from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<Notification title="Simple notification">
				This is a simple description of the notification
			</Notification>
		</Container>
	);
}
