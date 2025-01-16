import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { isCategoryName } from "../../lib/categories";
import { filterWikiByCategory } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/LoadedWikiComponent";

export function CategoryPage() {
	const { categoryName } = useParams();

	if (!isCategoryName(categoryName)) {
		return <div>Invalid category name</div>;
	}

	const filteredWiki = filterWikiByCategory(categoryName);

	return (
		<Container size="xl" p="lg">
			<Stack gap="xl">
				<Group justify="space-between">
					<Button
						variant="subtle"
						color="gray"
						leftSection={<IconArrowLeft />}
						component={Link}
						to="/"
					>
						See categories
					</Button>
					<Group gap="xs">
						<Text fw="bold" size="sm">
							{Object.keys(filteredWiki).length} components
						</Text>
					</Group>
				</Group>
				<Group>
					<Title>{categoryName}</Title>
				</Group>
				{Object.entries(filteredWiki).map(([timestamp, component]) => (
					<WikiComponentView key={timestamp} component={component} />
				))}
			</Stack>
		</Container>
	);
}
