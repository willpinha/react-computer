import { Group } from "@mantine/core";
import { CancelButton, SaveButton } from "./Buttons";

export function Index() {
	return (
		<Group gap="xs">
			<CancelButton />
			<SaveButton />
		</Group>
	);
}
