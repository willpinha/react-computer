import { Button } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

export function Index() {
	return (
		<Button color="red" leftSection={<IconTrash size={20} />}>
			Delete
		</Button>
	);
}
