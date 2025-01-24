import { ActionIcon, Tooltip } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export function Index() {
	return (
		<Tooltip label="Add new" withArrow>
			<ActionIcon radius="xl">
				<IconPlus />
			</ActionIcon>
		</Tooltip>
	);
}
