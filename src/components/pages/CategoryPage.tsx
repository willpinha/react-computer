import {
	ActionIcon,
	Button,
	Container,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	IconArrowLeft,
	IconBrandReact,
	IconBug,
	IconX,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { wiki } from "../../lib/wiki";
import { ThemeButton } from "../button/ThemeButton";
import { WikiComponentView } from "../wiki/WikiComponentView";

export function CategoryPage() {
	const { category } = useParams();

	if (!category || !wiki[category]) {
		return (
			<Group justify="center" align="center" h="100vh">
				<Tooltip
					label="Go back to categories"
					withArrow
					position="left"
				>
					<ActionIcon
						variant="subtle"
						color="gray"
						component={Link}
						to="/"
					>
						<IconX />
					</ActionIcon>
				</Tooltip>
				<Text>Category not found</Text>
			</Group>
		);
	}

	const numComponents = Object.keys(wiki[category]).length;

	return (
		<Container size={1440} p="lg">
			<Stack gap="xl">
				<Group justify="space-between">
					<Button
						variant="subtle"
						color="gray"
						leftSection={<IconArrowLeft />}
						component={Link}
						to="/"
					>
						Go back to categories
					</Button>

					<Group gap="xs">
						<ThemeIcon
							color="#04D0F4"
							size="xs"
							variant="transparent"
						>
							<IconBrandReact />
						</ThemeIcon>
						<Text fw="bold" size="sm">
							{numComponents} components
						</Text>
					</Group>
				</Group>

				<Group justify="space-between">
					<Title>{category}</Title>
					<Group>
						<Button
							size="xs"
							variant="default"
							leftSection={
								<ThemeIcon color="red" size="xs">
									<IconBug />
								</ThemeIcon>
							}
							component={Link}
							to={
								"https://github.com/willpinha/react-computer/issues/new?template=component-bug-report.yml"
							}
							target="_blank"
						>
							Report bug
						</Button>
						<ThemeButton />
					</Group>
				</Group>

				{Object.entries(wiki[category]).map(
					([componentName, component]) => (
						<WikiComponentView
							key={componentName}
							category={category}
							componentName={componentName}
							component={component}
						/>
					)
				)}
			</Stack>
		</Container>
	);
}
