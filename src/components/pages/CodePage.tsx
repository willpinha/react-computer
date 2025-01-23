import { CodeHighlightTabs } from "@mantine/code-highlight";
import {
	ActionIcon,
	Button,
	Divider,
	Group,
	Paper,
	SegmentedControl,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { CssIcon, TypeScriptIcon } from "@mantinex/dev-icons";
import {
	IconBrandGithub,
	IconBrandReact,
	IconCode,
	IconCopy,
	IconEye,
	IconPinned,
	IconStarFilled,
} from "@tabler/icons-react";
import { useParams } from "react-router";
import sharedClasses from "../../css/shared.module.css";
import { getWikiComponent } from "../../lib/wiki";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";

function getFileIcon(fileName: string) {
	if (fileName === "Index.tsx") {
		return (
			<ThemeIcon color="red" size="xs" radius="xl">
				<IconPinned />
			</ThemeIcon>
		);
	}

	if (fileName.endsWith(".ts") || fileName.endsWith(".tsx")) {
		return <TypeScriptIcon size={18} />;
	}

	if (fileName.endsWith(".css")) {
		return <CssIcon size={18} />;
	}

	return null;
}

export function CodePage() {
	const { timestamp } = useParams();

	if (!timestamp) {
		return null;
	}

	const component = getWikiComponent(timestamp);

	const loadedComponent = useLoadedWikiComponent(component);

	return (
		<Stack p="lg" gap="xs">
			{loadedComponent.isSuccess && (
				<Stack gap={0}>
					<Paper
						withBorder
						shadow="sm"
						style={{
							borderBottomLeftRadius: 0,
							borderBottomRightRadius: 0,
						}}
					>
						<Stack gap={0}>
							<Group
								p="xs"
								justify="space-between"
								className={sharedClasses.overlay}
							>
								<Group>
									<ActionIcon
										variant="default"
										size="sm"
										c="#04D0F4"
									>
										<IconBrandReact />
									</ActionIcon>
									<Title order={6}>
										{component.metadata.name}
									</Title>
									<ActionIcon
										variant="subtle"
										size="xs"
										color="gray"
									>
										<IconCopy />
									</ActionIcon>
								</Group>
								<Group>
									<Button.Group>
										<Button
											size="xs"
											variant="default"
											leftSection={
												<ThemeIcon
													variant="transparent"
													size="xs"
													color="yellow"
												>
													<IconStarFilled />
												</ThemeIcon>
											}
										>
											Starred
										</Button>
										<Button
											size="xs"
											variant="default"
											leftSection={
												<ThemeIcon
													variant="transparent"
													color="gray"
													size="xs"
												>
													<IconBrandGithub />
												</ThemeIcon>
											}
										>
											GitHub
										</Button>
									</Button.Group>
									<SegmentedControl
										size="xs"
										data={[
											{
												value: "preview",
												label: (
													<Group
														gap={5}
														wrap="nowrap"
													>
														<IconEye size={20} />
														<Text inherit>
															Preview
														</Text>
													</Group>
												),
											},
											{
												value: "code",
												label: (
													<Group
														gap={5}
														wrap="nowrap"
													>
														<IconCode size={20} />
														<Text inherit>
															Code
														</Text>
													</Group>
												),
											},
										]}
									/>
								</Group>
							</Group>
							<Divider />
							<CodeHighlightTabs
								getFileIcon={getFileIcon}
								withExpandButton
								defaultExpanded={false}
								expandCodeLabel="Show full code"
								collapseCodeLabel="Show less"
								code={[
									{
										fileName: "Index.tsx",
										code: loadedComponent.data.index
											.content,
										language: "tsx",
									},
									...loadedComponent.data.files.map(
										(file) => ({
											fileName: file.filename,
											code: file.content,
											language: "tsx",
										})
									),
								]}
							/>
						</Stack>
					</Paper>
				</Stack>
			)}
		</Stack>
	);
}
