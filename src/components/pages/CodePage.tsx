import { CodeHighlight } from "@mantine/code-highlight";
import {
	Button,
	Group,
	ScrollArea,
	Stack,
	Tabs,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconArrowLeft, IconPinned } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { getWikiComponent } from "../../lib/wiki";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";

export function CodePage() {
	const { timestamp } = useParams();

	if (!timestamp) {
		return null;
	}

	const component = getWikiComponent(timestamp);

	console.log(component);

	const loadedComponent = useLoadedWikiComponent(component);

	return (
		<Stack p="lg" gap="xl">
			<Group justify="start">
				<Button
					variant="subtle"
					size="sm"
					leftSection={<IconArrowLeft />}
					color="gray"
					component={Link}
					to={`/categories/${component.metadata.category}#${timestamp}`}
				>
					Go to {component.metadata.category}
				</Button>
			</Group>

			<Title order={4}>{component.metadata.name}</Title>

			<Stack gap={0}>
				<Tabs style={{ display: "contents" }} defaultValue="index">
					<ScrollArea scrollbarSize={10}>
						<Tabs.List style={{ flexWrap: "nowrap" }}>
							<Tabs.Tab
								value="index"
								leftSection={
									<ThemeIcon
										size="sm"
										variant="transparent"
										color="gray"
									>
										<IconPinned />
									</ThemeIcon>
								}
							>
								Index.tsx
							</Tabs.Tab>
							{component.files.map((file) => (
								<Tabs.Tab value={file.filename}>
									{file.filename}
								</Tabs.Tab>
							))}
						</Tabs.List>
					</ScrollArea>

					<Tabs.Panel value="index">
						<CodeHighlight
							code="const x = 2;console.log(10);"
							language="tsx"
						/>
					</Tabs.Panel>
				</Tabs>
			</Stack>
		</Stack>
	);
}
