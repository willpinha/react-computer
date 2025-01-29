import { Button, Popover, Text } from "@mantine/core";

export function Index() {
	return (
		<Popover width={200} position="bottom" withArrow shadow="md">
			<Popover.Target>
				<Button>Click me</Button>
			</Popover.Target>
			<Popover.Dropdown>
				<Text size="xs">
					Just a simple popover with some content inside
				</Text>
			</Popover.Dropdown>
		</Popover>
	);
}
