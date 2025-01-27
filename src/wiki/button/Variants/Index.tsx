import { Group } from "@mantine/core";
import {
	FilledButton,
	LightButton,
	SubtleButton,
	TransparentButton,
} from "./Buttons";

export function Index() {
	return (
		<Group>
			<FilledButton />
			<LightButton />
			<SubtleButton />
			<TransparentButton />
		</Group>
	);
}
