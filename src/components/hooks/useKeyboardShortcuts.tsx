import {
	Group,
	Kbd,
	Modal,
	Stack,
	Text,
	TypographyStylesProvider,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";
import { createContext, ReactNode, useContext } from "react";

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

function StarredComponentsModal() {
	useHotkeys([["alt+s", () => open()]]);

	const {
		starredComponentsDisclosure: [opened, { open, close }],
	} = useKeyboardShortcuts();

	return (
		<Modal opened={opened} onClose={close} title="My starred components">
			<Text>Starred components go here</Text>
		</Modal>
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
			<StarredComponentsModal />

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
