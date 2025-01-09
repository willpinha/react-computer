import { Container, Stack } from "@mantine/core";
import { wikiComponents } from "../../lib/wiki";

export function HomePage() {
	return (
		<Container>
			<Stack>{wikiComponents.map((component) => component.node)}</Stack>
		</Container>
	);
}
