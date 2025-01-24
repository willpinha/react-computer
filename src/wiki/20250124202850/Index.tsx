import { Button, Kbd } from "@mantine/core";
import { IconPrinter } from "@tabler/icons-react";

export function Index() {
	return (
		<Button
			leftSection={<IconPrinter size={20} />}
			rightSection={<Kbd size="xs">Ctrl+P</Kbd>}
			variant="default"
		>
			Print
		</Button>
	);
}
