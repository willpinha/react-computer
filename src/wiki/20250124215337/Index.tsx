import { Alert, Container } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert color="cyan" icon={<IconInfoCircle />} title="Info alert">
				This is an info alert
			</Alert>
		</Container>
	);
}
