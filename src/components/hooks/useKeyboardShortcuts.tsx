import {
	ActionIcon,
	Alert,
	Anchor,
	Button,
	Divider,
	Drawer,
	Group,
	Kbd,
	Modal,
	Stack,
	Text,
	TypographyStylesProvider,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHotkeys, useHover } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import {
	IconInfoCircle,
	IconStarFilled,
	IconStarOff,
	IconStarsOff,
} from "@tabler/icons-react";
import { createContext, ReactNode, useContext } from "react";
import { Link } from "react-router";
import { wiki } from "../../lib/wiki";
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
				<p>React Computer is something else</p>
			</TypographyStylesProvider>
		</Modal>
	);
}

function StarredComponentLink({ timestamp }: { timestamp: string }) {
	const component = wiki[timestamp];

	if (!component) {
		return null;
	}

	const { toggleStarred } = useStarredComponents();
	const { ref, hovered } = useHover();

	return (
		<Group>
			<ActionIcon
				ref={ref}
				variant="transparent"
				color={hovered ? "gray" : "yellow"}
				onClick={() => toggleStarred(timestamp)}
			>
				{hovered ? <IconStarOff /> : <IconStarFilled />}
			</ActionIcon>
			<Stack gap={0}>
				<Anchor
					component={Link}
					to={`/categories/${component.metadata.category}#${timestamp}`}
				>
					{component.metadata.name}
				</Anchor>
				<Text size="xs" c="dimmed">
					Timestamp {timestamp}
				</Text>
			</Stack>
		</Group>
	);
}

function StarredComponentsDrawer() {
	useHotkeys([["alt+s", () => open()]]);

	const {
		starredComponentsDisclosure: [opened, { open, close }],
	} = useKeyboardShortcuts();

	const { starred, removeAllStarred } = useStarredComponents();

	return (
		<Drawer
			opened={opened}
			onClose={close}
			title="My starred components"
			position="right"
		>
			<Stack>
				<Alert color="cyan" title="Important" icon={<IconInfoCircle />}>
					Your starred components are saved to local storage and do
					not persist outside of that browser
				</Alert>
				<Divider />
				<Text>{starred.length} component(s)</Text>
				{starred.map((timestamp) => (
					<StarredComponentLink
						key={timestamp}
						timestamp={timestamp}
					/>
				))}
				<Divider />
				<Group justify="end">
					<Button
						color="red"
						size="xs"
						leftSection={<IconStarsOff size={16} />}
						onClick={removeAllStarred}
					>
						Unstar all
					</Button>
				</Group>
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
