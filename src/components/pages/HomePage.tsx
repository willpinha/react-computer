import {
	ActionIcon,
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
	Tooltip,
} from "@mantine/core";
import {
	IconBook,
	IconBrandGithub,
	IconHeartFilled,
	IconKeyboard,
	IconSearch,
	IconStarsFilled,
	IconSun,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { categories } from "../../lib/categories";
import classes from "./HomePage.module.css";

export default function HomePage() {
	return (
		<Container size="xl" p="md">
			<Stack gap="xl" align="center">
				<Stack align="center" gap="xs">
					<Image src="/images/logo.svg" w={150} />
					<Title size={45}>
						react.
						<Text
							span
							inherit
							c="blue"
							variant="gradient"
							gradient={{ from: "#04D0F4", to: "blue" }}
						>
							computer
						</Text>
					</Title>
					<Group gap="sm">
						<Tooltip label="Sponsor" withArrow>
							<ActionIcon color="red">
								<IconHeartFilled />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="My starred components" withArrow>
							<ActionIcon variant="default">
								<ThemeIcon variant="transparent" color="yellow">
									<IconStarsFilled />
								</ThemeIcon>
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Documentation" withArrow>
							<ActionIcon variant="default">
								<IconBook />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Keyboard shortcuts" withArrow>
							<ActionIcon variant="default">
								<IconKeyboard />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="GitHub" withArrow>
							<ActionIcon variant="default">
								<IconBrandGithub />
							</ActionIcon>
						</Tooltip>
						<Tooltip label="Light theme" withArrow>
							<ActionIcon variant="default">
								<IconSun />
							</ActionIcon>
						</Tooltip>
					</Group>
				</Stack>

				<Stack w="100%" align="center" gap="xs">
					<TextInput
						w="100%"
						maw={420}
						placeholder="Search categories and components"
						leftSection={
							<ThemeIcon
								variant="transparent"
								color="gray"
								size="sm"
							>
								<IconSearch />
							</ThemeIcon>
						}
						rightSection={<Kbd size="xs">Alt + S</Kbd>}
						className={classes.searchInput}
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
							className={classes.categoryCard}
							withBorder
							shadow="sm"
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
