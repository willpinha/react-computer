import {
	ActionIcon,
	Anchor,
	Badge,
	Container,
	Group,
	Image,
	Kbd,
	Paper,
	SimpleGrid,
	Stack,
	Text,
	TextInput,
	ThemeIcon,
	Title,
} from "@mantine/core";
import {
	IconBook,
	IconBrandGithub,
	IconHeartFilled,
	IconSearch,
	IconSun,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { categories } from "../../lib/categories";

export default function HomePage() {
	return (
		<Container size="xl" p="md">
			<Stack gap="xl" align="center">
				<Group justify="space-between" w="100%">
					<Stack gap={0}>
						<Title order={3}>React Computer</Title>
						<Text size="xs" c="dimmed">
							Made with 🧠 by <Anchor>willpinha</Anchor> and{" "}
							<Anchor>contributors</Anchor>
						</Text>
					</Stack>

					<Group gap="sm">
						<ActionIcon color="red">
							<IconHeartFilled />
						</ActionIcon>
						<ActionIcon variant="default">
							<IconBook />
						</ActionIcon>
						<ActionIcon variant="default">
							<IconBrandGithub />
						</ActionIcon>
						<ActionIcon variant="default">
							<IconSun />
						</ActionIcon>
					</Group>
				</Group>

				<Image src="/images/logo.svg" w={150} />

				<Stack w="100%" align="center" gap="xs">
					<TextInput
						w="100%"
						maw={420}
						placeholder="Search components by timestamp"
						leftSection={
							<ThemeIcon
								variant="transparent"
								color="gray"
								size="sm"
							>
								<IconSearch />
							</ThemeIcon>
						}
						rightSection={<Kbd size="sm">Alt + S</Kbd>}
					/>
					<Text size="sm">
						<Badge component="span" size="xs" variant="outline">
							147
						</Badge>{" "}
						components in{" "}
						<Badge component="span" size="xs" variant="outline">
							12
						</Badge>{" "}
						categories
					</Text>
				</Stack>

				<SimpleGrid cols={{ sm: 1, md: 2, lg: 3 }} w="100%">
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
			</Stack>
		</Container>
	);
}
