import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconArrowLeft, IconBrandReact, IconBug } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { wiki } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/WikiComponentView";

export function CategoryPage() {
	const { category } = useParams();

	if (!category || !wiki[category]) {
		return "Category not found";
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
