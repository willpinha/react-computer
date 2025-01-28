import { Alert, Container } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

export function Index() {
	return (
		<Container size="xs">
			<Alert
				title="Success alert"
				color="green"
				icon={<IconCircleCheck />}
			>
				This is a success alert
			</Alert>
		</Container>
	);
}
