import {
	ActionIcon,
	Badge,
	Button,
	Container,
	Group,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	IconArrowLeft,
	IconBrandReact,
	IconBug,
	IconInfoCircle,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { getCategory } from "../../lib/categories";
import { filterWikiByCategory } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/LoadedWikiComponent";

type DependenciesProps = {
	category: Category;
};

function Dependencies({ category }: DependenciesProps) {
	if (!category.dependencies) {
		return null;
	}

	return (
		<Stack gap="xs">
			<Group gap="xs">
				<Title order={4}>Dependencies</Title>
				<ActionIcon radius="xl" size="sm" variant="subtle" color="gray">
					<IconInfoCircle />
				</ActionIcon>
			</Group>
			<Group>
				{category.dependencies.map((dependency) => (
					<Badge
						variant="outline"
						style={{ cursor: "pointer" }}
						color="violet"
						size="sm"
						component={Link}
						to="/"
						target="_blank"
					>
						{dependency.name}
					</Badge>
				))}
			</Group>
		</Stack>
	);
}

export function CategoryPage() {
	const { categoryName } = useParams();

	const category = getCategory(categoryName);

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
						<IconBrandReact size={18} color="#04D0F4" />
						<Text fw="bold" size="sm">
							{Object.keys(filteredWiki).length} components
						</Text>
					</Group>
				</Group>
				<Dependencies category={category} />
				<Group justify="space-between">
					<Title>{categoryName}</Title>
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
				</Group>
				{Object.entries(filteredWiki).map(([timestamp, component]) => (
					<WikiComponentView key={timestamp} component={component} />
				))}
			</Stack>
		</Container>
	);
}
