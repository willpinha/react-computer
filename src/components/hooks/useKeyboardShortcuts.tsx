import {
	ActionIcon,
	Alert,
	Anchor,
	Button,
	Drawer,
	Group,
	Kbd,
	Modal,
	Paper,
	Stack,
	Table,
	Text,
	Title,
	TypographyStylesProvider,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { IconMoodNeutral, IconStarsOff, IconX } from "@tabler/icons-react";
import { createContext, ReactNode, useContext } from "react";
import { Link } from "react-router";
import sharedClasses from "../../css/shared.module.css";
import { wiki, WikiComponent } from "../../lib/wiki";
import { useStarredComponents } from "./useStarredComponents";

type Disclosure = ReturnType<typeof useDisclosure>;

const KeyboardShortcutsContext = createContext<{
	documentationDisclosure: Disclosure;
	starredComponentsDisclosure: Disclosure;
	colorSchemeDisclosure: Disclosure;
	keyboardShortcutsDisclosure: Disclosure;
} | null>(null);

function KeyboardShortcutsModal() {
	useHotkeys([["alt+k", () => open()]]);

	const {
		keyboardShortcutsDisclosure: [opened, { open, close }],
	} = useKeyboardShortcuts();

	return (
		<Modal opened={opened} onClose={close} title="Keyboard shortcuts">
			<Stack>
				<Group>
					<Kbd>Alt+K</Kbd>
					<Text>List keyboard shortcuts</Text>
				</Group>
				<Group>
					<Kbd>Alt+F</Kbd>
					<Text>Find categories and components</Text>
				</Group>
				<Group>
					<Kbd>Alt+D</Kbd>
					<Text>Open documentation</Text>
				</Group>
				<Group>
					<Kbd>Alt+T</Kbd>
					<Text>Toggle color theme</Text>
				</Group>
				<Group>
					<Kbd>Alt+S</Kbd>
					<Text>List my starred components</Text>
				</Group>
			</Stack>
		</Modal>
	);
}

function DocumentationModal() {
	useHotkeys([["alt+d", () => open()]]);

	const {
		documentationDisclosure: [opened, { open, close }],
	} = useKeyboardShortcuts();

	return (
		<Modal opened={opened} onClose={close} title="Documentation">
			<TypographyStylesProvider>
				<h1>React Computer</h1>
				<p>
					React Computer is a huge collection of components made with
					React so you can be inspired by your user interface
					creations. It contains components grouped by categories
				</p>
				<p>
					This project was born with a single objective, which is to
					be the biggest collection of React components. To achieve
					this goal, it is open to contributions from any developer in
					the world. I believe every React developer has something
					unique to add to this project
				</p>
				<h2>About Mantine</h2>
				<p>
					Under the hood, React Computer uses{" "}
					<a href="https://mantine.dev/">Mantine</a> to create its
					components. This choice was made because I consider Mantine
					to be the most complete and batteries-included component
					library for React
				</p>
				<p>
					Note that you do not need to use Mantine in your
					applications to benefit from React Computer. This project
					can and should be used as a source of inspiration for design
					and features
				</p>
				<h2>Getting started</h2>
				<h3>Installing the dependencies</h3>
				<p>
					If you want to use React Computer code directly in your
					applications, you need to install both Mantine and Tabler
					Icons
				</p>
				<ul>
					<li>
						<a href="https://mantine.dev/getting-started">
							Install Mantine
						</a>
					</li>
					<li>
						<a href="https://tabler.io/docs/icons/libraries/react">
							Install Tabler Icons
						</a>
					</li>
				</ul>
				<p>
					In addition to these mandatory dependencies, some categories
					may also contain extra dependencies that must also be
					installed to use the components in that category. These
					extra dependencies are shown on the category pages
				</p>
				<h3>Understanding timestamps</h3>
				<p>
					A timestamp is a unique identifier for a component in React
					Computer. Timestamps are automatically generated and contain
					the format <code>YYYYMMDDHHMMSS</code>, representing the
					component creation time in UTC
				</p>
				<p>
					You can search for components using their timestamps. They
					are also used to manage your starred components and identify
					components when reporting bugs
				</p>
				<h2>Contributing</h2>
				<p>
					Contributions are open and welcome for all React developers
					in the world! Thank you very much for making this project
					what it is today
				</p>
				<p>
					See the{" "}
					<a href="https://github.com/willpinha/react-computer/blob/master/CONTRIBUTING.md">
						contribution guide
					</a>{" "}
					if you want to create your own components or report bugs
				</p>
				<h2>License</h2>
				<p>
					This project uses the{" "}
					<a href="https://github.com/willpinha/react-computer?tab=MIT-1-ov-file#readme">
						MIT license
					</a>
				</p>
			</TypographyStylesProvider>
		</Modal>
	);
}

type GroupedStarred = {
	[categoryName: string]: {
		[timestamp: string]: WikiComponent;
	};
};

function buildGroupedStarred(starred: string[]): GroupedStarred {
	const grouped: GroupedStarred = {};

	for (const timestamp of starred) {
		const component = wiki[timestamp];

		if (!component) {
			continue;
		}

		const { category } = component.metadata;

		if (!grouped[category]) {
			grouped[category] = {};
		}

		grouped[category][timestamp] = component;
	}

	return grouped;
}

function StarredComponentsDrawer() {
	useHotkeys([["alt+s", () => open()]]);

	const {
		starredComponentsDisclosure: [opened, { open, close }],
	} = useKeyboardShortcuts();

	const { starred, toggleStarred, removeAllStarred } = useStarredComponents();

	const groupedStarred = buildGroupedStarred(starred);

	return (
		<Drawer
			opened={opened}
			onClose={close}
			title="My starred components"
			position="right"
		>
			<Stack gap="xl">
				<Text c="dimmed">{starred.length} component(s)</Text>
				{starred.length === 0 && (
					<Alert
						color="gray"
						title="Nothing found"
						icon={<IconMoodNeutral />}
					>
						You don't have any starred components
					</Alert>
				)}
				{Object.entries(groupedStarred).map(([category, subwiki]) => (
					<Stack gap="xs" key={category}>
						<Title order={5}>{category}</Title>
						<Paper
							withBorder
							shadow="sm"
							className={sharedClasses.overlay}
						>
							<Table>
								<Table.Thead>
									<Table.Tr>
										<Table.Th w="100%">Component</Table.Th>
										<Table.Th></Table.Th>
									</Table.Tr>
								</Table.Thead>
								<Table.Tbody>
									{Object.entries(subwiki).map(
										([timestamp, component]) => (
											<Table.Tr key={timestamp}>
												<Table.Td>
													<Anchor
														component={Link}
														to={`/categories/${category}#${timestamp}`}
													>
														{
															component.metadata
																.name
														}
													</Anchor>
												</Table.Td>
												<Table.Td>
													<ActionIcon
														size="xs"
														variant="transparent"
														color="gray"
														onClick={() =>
															toggleStarred(
																timestamp
															)
														}
													>
														<IconX />
													</ActionIcon>
												</Table.Td>
											</Table.Tr>
										)
									)}
								</Table.Tbody>
							</Table>
						</Paper>
					</Stack>
				))}
				{starred.length > 0 && (
					<Group justify="end">
						<Button
							color="red"
							variant="outline"
							size="xs"
							leftSection={<IconStarsOff size={16} />}
							onClick={removeAllStarred}
						>
							Remove all
						</Button>
					</Group>
				)}
			</Stack>
		</Drawer>
	);
}

export function KeyboardShortcutsProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { toggleColorScheme } = useMantineColorScheme();

	useHotkeys([
		["alt+f", () => spotlight.open()],
		["alt+t", () => toggleColorScheme()],
	]);

	return (
		<KeyboardShortcutsContext.Provider
			value={{
				documentationDisclosure: useDisclosure(),
				starredComponentsDisclosure: useDisclosure(),
				colorSchemeDisclosure: useDisclosure(),
				keyboardShortcutsDisclosure: useDisclosure(),
			}}
		>
			<KeyboardShortcutsModal />
			<DocumentationModal />
			<StarredComponentsDrawer />

			{children}
		</KeyboardShortcutsContext.Provider>
	);
}

export function useKeyboardShortcuts() {
	const context = useContext(KeyboardShortcutsContext);

	if (context === null) {
		throw new Error(
			"useKeyboardShortcuts must be used inside KeyboardShortcutsContext"
		);
	}

	return context;
}
