import {
	Box,
	Button,
	Divider,
	Group,
	Loader,
	Paper,
	Stack,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	IconBrandGithub,
	IconBrandReact,
	IconCode,
	IconStar,
	IconStarFilled,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router";
import { getWikiComponent, prettifyTimestamp } from "../../lib/wiki";
import { CopyIconButton } from "../button/CopyIconButton";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";
import { useStarredComponents } from "../hooks/useStarredComponents";
import classes from "./WikiComponentView.module.css";

type WikiComponentProps = {
	timestamp: string;
};

export function WikiComponentView({ timestamp }: WikiComponentProps) {
	const component = getWikiComponent(timestamp);

	const loadedWikiComponent = useLoadedWikiComponent(component);

	const { isStarred, toggleStarred } = useStarredComponents();

	const starred = isStarred(timestamp);

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<Paper withBorder shadow="sm" id={timestamp}>
			<Group justify="space-between" p="xs">
				<Group gap="sm">
					<ThemeIcon variant="default" size="sm">
						{loadedWikiComponent.isLoading ? (
							<Loader size={14} color="#04D0F4" />
						) : (
							<IconBrandReact color="#04D0F4" />
						)}
					</ThemeIcon>
					<Stack gap={0}>
						<Title order={5}>{component.metadata.name}</Title>
						<Group gap="xs">
							<Tooltip label={`Timestamp ${timestamp}`}>
								<Text
									size="xs"
									c="dimmed"
									style={{ cursor: "help" }}
								>
									{prettifyTimestamp(timestamp)}
								</Text>
							</Tooltip>
							<CopyIconButton
								name="timestamp"
								value={timestamp}
							/>
						</Group>
					</Stack>
				</Group>
				<Button.Group>
					<Button
						variant="default"
						size="xs"
						leftSection={
							<ThemeIcon
								size="xs"
								variant="transparent"
								color={starred ? "yellow" : "gray"}
							>
								{starred ? <IconStarFilled /> : <IconStar />}
							</ThemeIcon>
						}
						onClick={() => toggleStarred(timestamp)}
					>
						{starred ? "Starred" : "Star"}
					</Button>
					<Button
						component={Link}
						to={"/opa"}
						variant="default"
						leftSection={
							<ThemeIcon color="dark" size="xs">
								<IconBrandGithub size={20} />
							</ThemeIcon>
						}
						size="xs"
					>
						GitHub
					</Button>
					<Button
						component={Link}
						to={"/opa"}
						variant="default"
						leftSection={
							<ThemeIcon color="blue" size="xs">
								<IconCode size={20} />
							</ThemeIcon>
						}
						size="xs"
					>
						Code
					</Button>
				</Button.Group>
			</Group>
			{loadedWikiComponent.isSuccess && (
				<>
					<Divider />
					<Box p="md" className={classes.render}>
						{children}
					</Box>
				</>
			)}
		</Paper>
	);

	if (loadedWikiComponent.isError) {
		return <Wrapper>Error</Wrapper>;
	}

	return <Wrapper>{loadedWikiComponent.data?.index.node}</Wrapper>;
}
