import { Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

export function Index() {
	return (
		<Alert title="Error alert" color="red" icon={<IconExclamationCircle />}>
			This is an error alert
		</Alert>
	);
}
