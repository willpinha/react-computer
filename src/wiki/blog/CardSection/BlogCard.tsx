import { Card, Group, Image, Stack, Text, Title } from "@mantine/core";

export function BlogCard() {
	return (
		<Card withBorder component="a" href="">
			<Card.Section>
				<Image src="/images/amazonia.jpg" alt="Amazônia" />
			</Card.Section>

			<Stack mt="xs">
				<Stack>
					<Title c="violet" order={5}>
						Card
					</Title>

					<Text fw="bold">
						This is a description for the blog card
					</Text>
				</Stack>

				<Group justify="space-between" c="dimmed">
					<Text size="xs">June 3, 2020</Text>
					<Text size="xs">2.5k views</Text>
				</Group>
			</Stack>
		</Card>
	);
}
