import { Alert, Container } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				color="yellow"
				title="Warning alert"
				icon={<IconAlertTriangle />}
			>
				This is a warning alert
			</Alert>
		</Container>
	);
}
