import { Button, Tooltip } from "@mantine/core";

export function Index() {
	return (
		<Tooltip label="Just a simple tooltip" withArrow>
			<Button>Hover me</Button>
		</Tooltip>
	);
}
