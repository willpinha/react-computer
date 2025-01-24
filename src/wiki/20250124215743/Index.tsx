import { Alert } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";

export function Index() {
	return (
		<Alert
			color="yellow"
			title="Warning alert"
			icon={<IconAlertTriangle />}
		>
			This is a warning alert
		</Alert>
	);
}
