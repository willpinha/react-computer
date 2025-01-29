import { Container, Select } from "@mantine/core";

export function Index() {
	const data = ["React", "Angular", "Vue", "Svelte"];

	return (
		<Container size="xs">
			<Select
				data={data}
				label="Label"
				description="This is a description"
				defaultValue={data[0]}
			/>
		</Container>
	);
}
