import {
	CodeHighlightTabs,
	CodeHighlightTabsCode,
} from "@mantine/code-highlight";
import {
	ActionIcon,
	Button,
	CopyButton,
	Divider,
	Group,
	Paper,
	SegmentedControl,
	Stack,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { CssIcon, TypeScriptIcon } from "@mantinex/dev-icons";
import {
	IconBrandGithub,
	IconBrandReact,
	IconCode,
	IconCopy,
	IconCopyCheck,
	IconEye,
	IconPinned,
	IconStar,
	IconStarFilled,
} from "@tabler/icons-react";
import { UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import sharedClasses from "../../css/shared.module.css";
import { getWikiComponent, LoadedWikiComponent } from "../../lib/wiki";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";
import { useStarredComponents } from "../hooks/useStarredComponents";

type CopyTimestampButtonProps = {
	timestamp: string;
};

function CopyTimestampButton({ timestamp }: CopyTimestampButtonProps) {
	return (
		<CopyButton value={timestamp}>
			{({ copied, copy }) => (
				<Tooltip label={copied ? "Copied!" : "Copy timestamp"}>
					<ActionIcon
						variant={copied ? "light" : "subtle"}
						size="xs"
						color={copied ? "teal" : "gray"}
						onClick={copy}
					>
						{copied ? <IconCopyCheck /> : <IconCopy />}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	);
}

type ReactIconButtonProps = {
	timestamp: string;
	loadedWikiComponent: UseQueryResult<LoadedWikiComponent>;
};

function ReactIconButton({
	timestamp,
	loadedWikiComponent,
}: ReactIconButtonProps) {
	return (
		<ActionIcon
			variant="default"
			size="sm"
			c="#04D0F4"
			loading={loadedWikiComponent.isLoading}
			component={Link}
			to={`#${timestamp}`}
		>
			<IconBrandReact />
		</ActionIcon>
	);
}

type GitHubButtonProps = {
	timestamp: string;
};

function GitHubButton({ timestamp }: GitHubButtonProps) {
	return (
		<Button
			size="xs"
			variant="default"
			leftSection={
				<ThemeIcon variant="transparent" color="gray" size="xs">
					<IconBrandGithub />
				</ThemeIcon>
			}
			component={Link}
			to={`https://github.com/willpinha/react-computer/tree/master/src/wiki/${timestamp}`}
			target="_blank"
		>
			GitHub
		</Button>
	);
}

type StarButtonProps = {
	timestamp: string;
};

function StarButton({ timestamp }: StarButtonProps) {
	const { isStarred, toggleStarred } = useStarredComponents();

	const starred = isStarred(timestamp);

	return (
		<Button
			size="xs"
			variant="default"
			onClick={() => toggleStarred(timestamp)}
			leftSection={
				<ThemeIcon
					variant="transparent"
					size="xs"
					color={starred ? "yellow" : "gray"}
				>
					{starred ? <IconStarFilled /> : <IconStar />}
				</ThemeIcon>
			}
		>
			{starred ? "Starred" : "Star"}
		</Button>
	);
}

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

type WikiComponentCodeProps = {
	loadedWikiComponent: UseQueryResult<LoadedWikiComponent>;
};

function WikiComponentCode({ loadedWikiComponent }: WikiComponentCodeProps) {
	let code: CodeHighlightTabsCode[] = [];

	function getLanguage(fileName: string) {
		const language = fileName.split(".").pop();

		return language;
	}

	if (loadedWikiComponent.isLoading) {
		return null;
	}

	if (loadedWikiComponent.isSuccess) {
		code = [
			{
				fileName: "Index.tsx",
				code: loadedWikiComponent.data.index.content,
				language: "tsx",
			},
			...loadedWikiComponent.data.files.map((file) => ({
				fileName: file.filename,
				code: file.content,
				language: getLanguage(file.filename),
			})),
		];
	}

	return (
		<CodeHighlightTabs
			getFileIcon={getFileIcon}
			withExpandButton
			defaultExpanded={false}
			expandCodeLabel="Show full code"
			collapseCodeLabel="Show less"
			code={code}
		/>
	);
}

type WikiComponentPreviewProps = {
	loadedWikiComponent: UseQueryResult<LoadedWikiComponent>;
};

function WikiComponentPreview({
	loadedWikiComponent,
}: WikiComponentPreviewProps) {
	if (loadedWikiComponent.isError) {
		return <Text c="red">Error loading component</Text>;
	}

	if (loadedWikiComponent.isPending) {
		return null;
	}

	return (
		<Paper p="sm" className={sharedClasses.darkOverlay}>
			{loadedWikiComponent.data.index.node}
		</Paper>
	);
}

type WikiComponentViewProps = {
	timestamp: string;
};

export function WikiComponentView({ timestamp }: WikiComponentViewProps) {
	const location = useLocation();

	const component = getWikiComponent(timestamp);

	const loadedWikiComponent = useLoadedWikiComponent(component);

	const [currentTab, setCurrentTab] = useState<string>("preview");

	const { scrollIntoView, targetRef } = useScrollIntoView({ duration: 0 });

	useEffect(() => {
		if (location.hash === `#${timestamp}`) {
			scrollIntoView({
				alignment: "center",
			});
		}
	}, [location.hash]);

	return (
		<Paper
			withBorder
			shadow="sm"
			style={{
				borderBottomLeftRadius: 0,
				borderBottomRightRadius: 0,
			}}
			ref={targetRef}
		>
			<Stack gap={0}>
				<Group
					p="xs"
					justify="space-between"
					className={sharedClasses.overlay}
				>
					<Group>
						<ReactIconButton
							timestamp={timestamp}
							loadedWikiComponent={loadedWikiComponent}
						/>
						<Title order={6}>{component.metadata.name}</Title>
						<CopyTimestampButton timestamp={timestamp} />
					</Group>
					<Group>
						<Button.Group>
							<StarButton timestamp={timestamp} />
							<GitHubButton timestamp={timestamp} />
						</Button.Group>
						<SegmentedControl
							size="xs"
							value={currentTab}
							onChange={setCurrentTab}
							data={[
								{
									value: "preview",
									label: (
										<Group gap={5} wrap="nowrap">
											<IconEye size={20} />
											<Text inherit>Preview</Text>
										</Group>
									),
								},
								{
									value: "code",
									label: (
										<Group gap={5} wrap="nowrap">
											<IconCode size={20} />
											<Text inherit>Code</Text>
										</Group>
									),
								},
							]}
						/>
					</Group>
				</Group>
				<Divider />
				{currentTab === "preview" && (
					<WikiComponentPreview
						loadedWikiComponent={loadedWikiComponent}
					/>
				)}

				{currentTab === "code" && (
					<WikiComponentCode
						loadedWikiComponent={loadedWikiComponent}
					/>
				)}
			</Stack>
		</Paper>
	);
}
