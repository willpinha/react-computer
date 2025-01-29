import { Tabs } from "@mantine/core";

export function Index() {
	return (
		<Tabs defaultValue="tab-1">
			<Tabs.List>
				<Tabs.Tab value="tab-1">Tab 1</Tabs.Tab>
				<Tabs.Tab value="tab-2">Tab 2</Tabs.Tab>
				<Tabs.Tab value="tab-3">Tab 3</Tabs.Tab>
			</Tabs.List>

			<Tabs.Panel value="tab-1">Tab 1 content</Tabs.Panel>

			<Tabs.Panel value="tab-2">Tab 2 content</Tabs.Panel>

			<Tabs.Panel value="tab-3">Tab 3 content</Tabs.Panel>
		</Tabs>
	);
}
