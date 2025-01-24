import { Alert, Container } from "@mantine/core";
import { IconMoodNeutral } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				color="gray"
				icon={<IconMoodNeutral />}
				title="Neutral alert"
			>
				This is a neutral alert
			</Alert>
		</Container>
	);
}
