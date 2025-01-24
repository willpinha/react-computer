import { Button, Group } from "@mantine/core";

export function Index() {
	return (
		<Group>
			<Button variant="subtle" color="gray">
				Cancel
			</Button>
			<Button color="blue">Save</Button>
		</Group>
	);
}
