import { Alert, Container } from "@mantine/core";
import { IconAlertHexagon } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert title="Error alert" color="red" icon={<IconAlertHexagon />}>
				This is an error alert
			</Alert>
		</Container>
	);
}
