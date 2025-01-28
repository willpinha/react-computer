import { ActionIcon, Tooltip, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ThemeButton() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();

	return (
		<Tooltip
			label={colorScheme === "dark" ? "Light mode" : "Dark mode"}
			withArrow
		>
			<ActionIcon
				onClick={toggleColorScheme}
				variant="default"
				c={colorScheme === "dark" ? "yellow" : "violet"}
			>
				{colorScheme === "dark" ? <IconSun /> : <IconMoon />}
			</ActionIcon>
		</Tooltip>
	);
}
