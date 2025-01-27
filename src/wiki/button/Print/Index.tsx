import { Button, Kbd, ThemeIcon } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export function Index() {
	return (
		<Button
			leftSection={
				<ThemeIcon size="sm" variant="transparent" color="gray">
					<IconPrinter />
				</ThemeIcon>
			}
			rightSection={<Kbd size="xs">Ctrl+P</Kbd>}
			variant="default"
		>
			Print
		</Button>
	);
}
