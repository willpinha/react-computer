import { Container, Stack } from "@mantine/core";
import { filterWikiByCategory } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/LoadedWikiComponent";

export default function HomePage() {
	const filteredWiki = filterWikiByCategory("radio");

	return (
		<Container size="xl" p="md">
			<Stack gap="xl">
				{Object.entries(filteredWiki).map(([timestamp, component]) => (
					<WikiComponentView key={timestamp} component={component} />
				))}
			</Stack>
		</Container>
	);
}
