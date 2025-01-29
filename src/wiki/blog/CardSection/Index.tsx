import { Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { BlogCard } from "./BlogCard";

export function Index() {
	return (
		<Stack align="center">
			<Title>Title of section</Title>
			<Text c="dimmed" size="sm">
				This is a section with multiple cards
			</Text>
			<Container size="lg">
				<SimpleGrid cols={{ xs: 1, sm: 2, md: 4 }}>
					<BlogCard />
					<BlogCard />
					<BlogCard />
					<BlogCard />
				</SimpleGrid>
			</Container>
		</Stack>
	);
}
