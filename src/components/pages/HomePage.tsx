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
	useMantineColorScheme,
} from "@mantine/core";
import { spotlight } from "@mantine/spotlight";
import {
	IconBook,
	IconBrandGithub,
	IconHeartFilled,
	IconKeyboard,
	IconMoon,
	IconSearch,
	IconStarsFilled,
	IconSun,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { categories } from "../../lib/categories";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import classes from "./HomePage.module.css";

function SearchInput() {
	return (
		<UnstyledButton
			className={classes.searchInput}
			onClick={spotlight.open}
		>
			<Group justify="space-between" wrap="nowrap">
				<Group gap="sm" wrap="nowrap">
					<ThemeIcon variant="transparent" color="gray" size="xs">
						<IconSearch />
					</ThemeIcon>
					<Text className={classes.placeholder} lineClamp={1}>
						Find categories and components
					</Text>
				</Group>
				<Kbd size="xs">Alt+F</Kbd>
			</Group>
		</UnstyledButton>
	);
}

function KeyboardShortcutsButton() {
	const {
		keyboardShortcutsDisclosure: [_, { open }],
	} = useKeyboardShortcuts();

	return (
		<Tooltip label="Keyboard shortcuts" withArrow>
			<ActionIcon variant="default" onClick={open}>
				<IconKeyboard />
			</ActionIcon>
		</Tooltip>
	);
}

function DocumentationButton() {
	const {
		documentationDisclosure: [_, { open }],
	} = useKeyboardShortcuts();

	return (
		<Tooltip label="Documentation" withArrow>
			<ActionIcon variant="default" onClick={open}>
				<IconBook />
			</ActionIcon>
		</Tooltip>
	);
}

function StarredComponentsButton() {
	const {
		starredComponentsDisclosure: [_, { open }],
	} = useKeyboardShortcuts();

	return (
		<Tooltip label="My starred components" withArrow>
			<ActionIcon variant="default" onClick={open}>
				<ThemeIcon variant="transparent" color="yellow">
					<IconStarsFilled />
				</ThemeIcon>
			</ActionIcon>
		</Tooltip>
	);
}

function ThemeButton() {
	const { toggleColorScheme, colorScheme } = useMantineColorScheme();

	return (
		<Tooltip
			label={colorScheme === "dark" ? "Light theme" : "Dark theme"}
			withArrow
		>
			<ActionIcon variant="default" onClick={toggleColorScheme}>
				{colorScheme === "dark" ? <IconSun /> : <IconMoon />}
			</ActionIcon>
		</Tooltip>
	);
}

export default function HomePage() {
	return (
		<Container size="xl" p="md">
			<Stack gap="xl" align="center">
				<Stack align="center" gap="xs">
					<Image src="/images/logo.svg" w={150} />
					<Title size={40}>
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
						<StarredComponentsButton />
						<DocumentationButton />
						<KeyboardShortcutsButton />
						<Tooltip label="GitHub" withArrow>
							<ActionIcon
								variant="default"
								component={Link}
								to="https://github.com/willpinha/react-computer"
							>
								<IconBrandGithub />
							</ActionIcon>
						</Tooltip>
						<ThemeButton />
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
