import { Alert } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export function Index() {
	return (
		<Alert color="green" title="Success alert" icon={<IconCircleCheck />}>
			This is a success alert
		</Alert>
	);
}
