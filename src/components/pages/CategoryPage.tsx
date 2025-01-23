import {
	ActionIcon,
	Badge,
	Button,
	Container,
	Group,
	Popover,
	Stack,
	Text,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
	IconArrowLeft,
	IconBrandReact,
	IconBug,
	IconInfoCircle,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { getCategory } from "../../lib/categories";
import { filterWikiByCategory } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/WikiComponentView";

type DependenciesProps = {
	category: Category;
};

function Dependencies({ category }: DependenciesProps) {
	const [opened, { close, open }] = useDisclosure(false);

	if (!category.dependencies) {
		return null;
	}

	return (
		<Stack gap="xs">
			<Group gap="xs">
				<Title order={4}>Dependencies</Title>
				<Popover width={250} opened={opened} withArrow>
					<Popover.Target>
						<ActionIcon
							radius="xl"
							size="sm"
							variant="subtle"
							color="gray"
							onMouseEnter={open}
							onMouseLeave={close}
						>
							<IconInfoCircle />
						</ActionIcon>
					</Popover.Target>
					<Popover.Dropdown>
						<Text size="xs">
							These dependencies are necessary for the components
							to work
						</Text>
					</Popover.Dropdown>
				</Popover>
			</Group>
			<Group>
				{category.dependencies.map((dependency) => (
					<Badge
						key={dependency.name}
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
	const { categorySlug } = useParams();

	const category = getCategory(categorySlug);

	const filteredWiki = filterWikiByCategory(categorySlug as CategoryName);

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
					<Title>{category.name}</Title>
					<Group>
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
				</Group>
				{Object.keys(filteredWiki).map((timestamp) => (
					<WikiComponentView key={timestamp} timestamp={timestamp} />
				))}
			</Stack>
		</Container>
	);
}
