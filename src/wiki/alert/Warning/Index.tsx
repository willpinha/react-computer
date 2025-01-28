import { Alert, Container } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				title="Warning alert"
				color="yellow"
				icon={<IconAlertTriangle />}
			>
				This is a warning alert
			</Alert>
		</Container>
	);
}
