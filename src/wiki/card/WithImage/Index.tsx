import { Card, Image, Stack, Text, Title } from "@mantine/core";

export function Index() {
	return (
		<Card maw={400}>
			<Card.Section pb="sm">
				<Image src="/images/amazonia.jpg" />
			</Card.Section>

			<Stack>
				<Title>Some card</Title>

				<Text c="dimmed">
					This is a simple description about the card
				</Text>
			</Stack>
		</Card>
	);
}
