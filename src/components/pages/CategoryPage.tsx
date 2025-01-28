import { Button, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
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
		<Stack gap="xl" p="lg">
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
					<ThemeIcon color="#04D0F4" size="sm" variant="transparent">
						<IconBrandReact />
					</ThemeIcon>
					<Text>{numComponents} components</Text>
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
	);
}
