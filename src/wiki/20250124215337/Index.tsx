import { Alert } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export function Index() {
	return (
		<Alert color="cyan" icon={<IconInfoCircle />} title="Info alert">
			This is an info alert
		</Alert>
	);
}
