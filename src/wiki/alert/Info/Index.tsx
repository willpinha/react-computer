import { Alert, Container } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert title="Info alert" color="cyan" icon={<IconInfoCircle />}>
				This is an info alert
			</Alert>
		</Container>
	);
}
