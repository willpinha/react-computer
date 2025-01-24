import { Alert, Container } from "@mantine/core";

export function Index() {
	return (
		<Container size="xs">
			<Alert title="Filled alert" variant="filled">
				This is a filled alert
			</Alert>
		</Container>
	);
}
