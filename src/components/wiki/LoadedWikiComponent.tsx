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
} from "@mantine/core";
import {
	IconBrandGithub,
	IconBrandReact,
	IconBug,
	IconCode,
} from "@tabler/icons-react";
import { ReactNode } from "react";
import { Link } from "react-router";
import { WikiComponent } from "../../lib/wiki";
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
						<IconBrandReact color="#04D0F4" />
					</ThemeIcon>
					<Stack gap={0}>
						<Title order={5}>{component.metadata.name}</Title>
						<Text size="xs" c="dimmed">
							Created at 12/12/2021 13:00:32 (UTC)
						</Text>
					</Stack>
				</Group>
				<Button.Group>
					<Button
						variant="default"
						leftSection={
							<ThemeIcon color="red" size="xs">
								<IconBug size={20} />
							</ThemeIcon>
						}
						size="xs"
					>
						Report bug
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
			<Divider />
			<Box p="md" className={classes.render}>
				{children}
			</Box>
		</Paper>
	);

	if (loadedWikiComponent.isPending) {
		return (
			<Wrapper>
				<Loader size="sm" />
			</Wrapper>
		);
	}

	if (loadedWikiComponent.isError) {
		return <Wrapper>Error</Wrapper>;
	}

	return <Wrapper>{loadedWikiComponent.data.index.node}</Wrapper>;
}
