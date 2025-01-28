import { ActionIcon, TextInput, TextInputProps } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";

type SearchWithButtonProps = TextInputProps & {};

export function SearchWithButton({}: SearchWithButtonProps) {
	return (
		<TextInput
			placeholder="Search for something"
			leftSection={<IconSearch size={20} />}
			rightSection={
				<ActionIcon size="md" color="blue">
					<IconArrowRight />
				</ActionIcon>
			}
		/>
	);
}
