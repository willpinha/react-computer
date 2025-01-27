import { Anchor, Group, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import { IconBrandReact, IconHash } from "@tabler/icons-react";
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
		<Stack gap="xl" pb="lg">
			<Stack px="lg" pt="lg">
				<Group justify="space-between">
					<Anchor component={Link} to="/" size="sm">
						Go back to categories
					</Anchor>

					<Group gap="xs">
						<ThemeIcon
							color="#04D0F4"
							size="xs"
							variant="transparent"
						>
							<IconBrandReact />
						</ThemeIcon>
						<Text size="sm">{numComponents} components</Text>
					</Group>
				</Group>

				<Group gap="xs">
					<IconHash />
					<Title order={2}>{category}</Title>
				</Group>
			</Stack>

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
