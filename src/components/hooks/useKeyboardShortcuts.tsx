import { useHotkeys } from "@mantine/hooks";
import { spotlight } from "@mantine/spotlight";

export function useKeyboardShortcuts() {
	useHotkeys([["alt+s", () => spotlight.open()]]);
}
