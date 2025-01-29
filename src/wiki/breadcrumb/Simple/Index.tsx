import { Anchor, Breadcrumbs } from "@mantine/core";

export function Index() {
	return (
		<Breadcrumbs>
			<Anchor>Home</Anchor>
			<Anchor>Docs</Anchor>
			<Anchor>Components</Anchor>
		</Breadcrumbs>
	);
}
