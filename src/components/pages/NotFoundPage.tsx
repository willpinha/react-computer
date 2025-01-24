import { Anchor, Container, Image, Stack, Text, Title } from "@mantine/core";
import { Link } from "react-router";

export function NotFoundPage() {
	return (
		<Container size="xs" p="md">
			<Stack align="center">
				<Image src="/images/logo.svg" w={150} />
				<Title>PAGE NOT FOUND</Title>
				<Text>The page you are looking for does not exist!</Text>
				<Anchor component={Link} to="/">
					Go back to categories
				</Anchor>
			</Stack>
		</Container>
	);
}
