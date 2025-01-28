import { Alert, Container } from "@mantine/core";
import { IconFocus } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert title="Important alert" color="violet" icon={<IconFocus />}>
				This is an important alert
			</Alert>
		</Container>
	);
}
