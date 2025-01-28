import {
	Button,
	Container,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { IconArrowLeft, IconBrandReact } from "@tabler/icons-react";
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

				<Title>{category}</Title>

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
