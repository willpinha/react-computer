import {
	Container,
	Group,
	Paper,
	SimpleGrid,
	ThemeIcon,
	Title,
} from "@mantine/core";
import { Link } from "react-router";
import { categories } from "../../lib/categories";

export default function HomePage() {
	return (
		<Container size="xl" p="md">
			<SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }}>
				{categories.map((category) => (
					<Paper
						key={category.name}
						withBorder
						shadow="md"
						p="md"
						component={Link}
						to={`/categories/${category.name}`}
					>
						<Group c="gray">
							<ThemeIcon color={category.color}>
								{category.icon}
							</ThemeIcon>

							<Title order={2}>{category.name}</Title>
						</Group>
					</Paper>
				))}
			</SimpleGrid>
		</Container>
	);
}
