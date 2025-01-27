import {
	CodeHighlightTabs,
	CodeHighlightTabsCode,
} from "@mantine/code-highlight";
import {
	ActionIcon,
	Divider,
	Group,
	Paper,
	SegmentedControl,
	Stack,
	Text,
	ThemeIcon,
	Tooltip,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { CssIcon, GithubIcon, TypeScriptIcon } from "@mantinex/dev-icons";
import {
	IconBrandReact,
	IconCode,
	IconEye,
	IconPinned,
} from "@tabler/icons-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import sharedClasses from "../../css/shared.module.css";
import {
	LoadedWikiComponent,
	loadWikiComponent,
	WikiComponent,
} from "../../lib/wiki";

type ReactIconButtonProps = {
	componentName: string;
	loadedWikiComponent: UseQueryResult<LoadedWikiComponent>;
};

function ReactIconButton({
	componentName,
	loadedWikiComponent,
}: ReactIconButtonProps) {
	return (
		<ActionIcon
			variant="default"
			size="sm"
			c="#04D0F4"
			loading={loadedWikiComponent.isLoading}
			component={Link}
			to={`#${componentName}`}
		>
			<IconBrandReact />
		</ActionIcon>
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
				code: loadedWikiComponent.data.indexContent,
				language: "tsx",
			},
			...loadedWikiComponent.data.files.map((file) => ({
				fileName: file.name,
				code: file.content,
				language: getLanguage(file.name),
			})),
		];
	}

	return (
		<CodeHighlightTabs
			getFileIcon={getFileIcon}
			withExpandButton
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
		console.error(loadedWikiComponent.error);

		return (
			<Text c="red" p="sm">
				Error loading component
			</Text>
		);
	}

	if (loadedWikiComponent.isPending) {
		return null;
	}

	const { Index } = loadedWikiComponent.data;

	return (
		<Paper p="sm" className={sharedClasses.darkOverlay}>
			<Index />
		</Paper>
	);
}

type WikiComponentViewProps = {
	category: string;
	componentName: string;
	component: WikiComponent;
};

export function WikiComponentView({
	category,
	componentName,
	component,
}: WikiComponentViewProps) {
	const loadedWikiComponent = useQuery({
		queryKey: ["component", category, componentName],
		queryFn: async () => await loadWikiComponent(component),
	});

	const location = useLocation();

	const [currentTab, setCurrentTab] = useState<string>("preview");

	const { scrollIntoView, targetRef } = useScrollIntoView({ duration: 0 });

	useEffect(() => {
		if (location.hash === `#${componentName}`) {
			scrollIntoView({
				alignment: "center",
			});
		}
	}, [location.hash]);

	return (
		<Paper withBorder radius={0} ref={targetRef}>
			<Stack gap={0}>
				<Group
					justify="space-between"
					p="xs"
					className={sharedClasses.overlay}
				>
					<Group>
						<ReactIconButton
							componentName={componentName}
							loadedWikiComponent={loadedWikiComponent}
						/>
						<Text fw="bold">{componentName}</Text>
					</Group>
					<Group>
						<Tooltip label="View on GitHub">
							<ActionIcon
								size="xs"
								variant="subtle"
								color="gray"
								component={Link}
								to={`https://github.com/willpinha/react-computer/tree/master/src/wiki/${category}/${componentName}`}
							>
								<GithubIcon />
							</ActionIcon>
						</Tooltip>
						<SegmentedControl
							size="xs"
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
							value={currentTab}
							onChange={setCurrentTab}
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
