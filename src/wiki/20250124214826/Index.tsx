import { Alert, Container } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				title="Error alert"
				color="red"
				icon={<IconExclamationCircle />}
			>
				This is an error alert
			</Alert>
		</Container>
	);
}
