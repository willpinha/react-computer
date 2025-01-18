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
import { IconBrandGithub, IconBrandReact, IconCode } from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router";
import { WikiComponent } from "../../lib/wiki";
import { CopyIconButton } from "../button/CopyIconButton";
import { useLoadedWikiComponent } from "../hooks/useLoadedWikiComponent";
import classes from "./LoadedWikiComponent.module.css";

type WikiComponentProps = {
	component: WikiComponent;
};

export function WikiComponentView({ component }: WikiComponentProps) {
	const loadedWikiComponent = useLoadedWikiComponent(component);

	const Wrapper = ({ children }: { children: ReactNode }) => (
		<Paper withBorder shadow="md">
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
							<Tooltip label="Created at 10/12/2024 12:45:00 (UTC)">
								<Text
									size="xs"
									c="dimmed"
									style={{ cursor: "help" }}
								>
									Timestamp 202410124520
								</Text>
							</Tooltip>
							<CopyIconButton name="timestamp" value="" />
						</Group>
					</Stack>
				</Group>
				<Button.Group>
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
