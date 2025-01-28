import { Alert, Container } from "@mantine/core";
import { IconMoodNeutral } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				title="Neutral alert"
				variant="default"
				icon={<IconMoodNeutral />}
			>
				This is a neutral alert
			</Alert>
		</Container>
	);
}
