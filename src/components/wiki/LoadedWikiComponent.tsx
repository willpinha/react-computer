import {
	Box,
	Button,
	Divider,
	Group,
	Loader,
	Paper,
	Title,
} from "@mantine/core";
import { IconArrowsMaximize, IconBug } from "@tabler/icons-react";
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
				<Title order={5}>{component.metadata.name}</Title>
				<Button.Group>
					<Button
						variant="default"
						leftSection={<IconBug size={20} />}
						size="xs"
					>
						Report bug
					</Button>
					<Button
						component={Link}
						to={"/opa"}
						variant="default"
						leftSection={<IconArrowsMaximize size={20} />}
						size="xs"
					>
						Expand
					</Button>
				</Button.Group>
			</Group>
			<Divider />
			<Box p="xs" className={classes.render}>
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
