import { Alert } from "@mantine/core";
import { IconMoodNeutral } from "@tabler/icons-react";

export function Index() {
	return (
		<Alert color="gray" icon={<IconMoodNeutral />} title="Neutral alert">
			This is a neutral alert
		</Alert>
	);
}
