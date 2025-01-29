import { Accordion } from "@mantine/core";

export function Index() {
	const items = [
		{ value: "Hello", description: "This is the content for Hello" },
		{ value: "World", description: "This is the content for World" },
		{ value: "Foo", description: "This is the content for Foo" },
		{ value: "Bar", description: "This is the content for Bar" },
	];

	return (
		<Accordion>
			{items.map((item) => (
				<Accordion.Item key={item.value} value={item.value}>
					<Accordion.Control>{item.value}</Accordion.Control>
					<Accordion.Panel>{item.description}</Accordion.Panel>
				</Accordion.Item>
			))}
		</Accordion>
	);
}
