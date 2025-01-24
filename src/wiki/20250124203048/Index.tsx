import { Avatar, Button } from "@mantine/core";

export function Index() {
	return (
		<Button
			radius="xl"
			leftSection={<Avatar src="/images/avatar.svg" size="sm" />}
			variant="default"
		>
			@react-computer
		</Button>
	);
}
