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
	ThemeIcon,
	Title,
	Tooltip,
	UnstyledButton,
} from "@mantine/core";
import { spotlight, Spotlight } from "@mantine/spotlight";
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

function SearchInput() {
	return (
		<>
			<UnstyledButton
				className={classes.searchInput}
				onClick={spotlight.open}
			>
				<Group justify="space-between">
					<Group gap="sm">
						<ThemeIcon variant="transparent" color="gray" size="xs">
							<IconSearch />
						</ThemeIcon>
						<Text className={classes.placeholder}>
							Search categories and components
						</Text>
					</Group>
					<Kbd size="xs">Alt + S</Kbd>
				</Group>
			</UnstyledButton>
			<Spotlight actions={[]} />
		</>
	);
}

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
					<SearchInput />
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
