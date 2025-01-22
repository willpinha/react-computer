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
import {
	IconArrowLeft,
	IconBrandCss3,
	IconBrandTypescript,
	IconPinned,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { getWikiComponent } from "../../lib/wiki";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";

export function CodePage() {
	const { timestamp } = useParams();

	if (!timestamp) {
		return null;
	}

	const component = getWikiComponent(timestamp);

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
									<Group gap="xs" wrap="nowrap">
										<ThemeIcon
											size="sm"
											variant="transparent"
											color="gray"
										>
											<IconPinned />
										</ThemeIcon>
										<ThemeIcon
											size="xs"
											radius="sm"
											color="blue"
										>
											<IconBrandTypescript size={15} />
										</ThemeIcon>
									</Group>
								}
							>
								Index.tsx
							</Tabs.Tab>
							<Tabs.Tab
								value="b"
								leftSection={
									<ThemeIcon
										size="xs"
										radius="sm"
										color="violet"
									>
										<IconBrandCss3 />
									</ThemeIcon>
								}
							>
								Hello.module.css
							</Tabs.Tab>
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
