import {
	ActionIcon,
	Badge,
	Button,
	Group,
	Image,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { Spotlight, SpotlightActionData, spotlight } from "@mantine/spotlight";
import {
	IconBook2,
	IconBrandGithub,
	IconBrandOpenSource,
	IconHash,
	IconHeartFilled,
	IconSearch,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { numCategories, numComponents, wiki } from "../../lib/wiki";
import { ThemeButton } from "../button/ThemeButton";

function SearchCategoriesButton() {
	const actions: SpotlightActionData[] = Object.keys(wiki).map(
		(category) => ({
			id: category,
			label: category,
			leftSection: <IconHash size={20} />,
		})
	);

	return (
		<>
			<Tooltip label="Search categories" withArrow>
				<ActionIcon variant="default" onClick={spotlight.open}>
					<IconSearch />
				</ActionIcon>
			</Tooltip>

			<Spotlight
				highlightQuery
				actions={actions}
				nothingFound="No categories found"
				searchProps={{
					leftSection: <IconSearch size={20} />,
					placeholder: "Search categories",
				}}
			/>
		</>
	);
}

export function HomePage() {
	return (
		<Stack gap="xl" p="md" align="center">
			<Stack align="center" gap="md">
				<Image src="/images/logo.svg" w={180} />

				<Stack gap={0} align="center">
					<Title size={40}>
						react.
						<Text
							span
							inherit
							c="blue"
							variant="gradient"
							gradient={{ from: "#04D0F4", to: "blue" }}
						>
							computer
						</Text>
					</Title>

					<Text ta="center">
						<Badge variant="outline" size="xs" component="span">
							{numComponents()}
						</Badge>{" "}
						components in{" "}
						<Badge variant="outline" size="xs" component="span">
							{numCategories()}
						</Badge>{" "}
						categories
					</Text>
				</Stack>

				<Group gap="xs">
					<Tooltip label="Sponsor" withArrow>
						<ActionIcon
							color="red"
							component={Link}
							to="https://github.com/sponsors/willpinha"
						>
							<IconHeartFilled />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="Contribute" withArrow>
						<ActionIcon
							component={Link}
							to="https://github.com/willpinha/react-computer/blob/master/CONTRIBUTING.md"
						>
							<IconBrandOpenSource />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="README" withArrow>
						<ActionIcon
							variant="default"
							component={Link}
							to="https://github.com/willpinha/react-computer/blob/master/README.md"
						>
							<IconBook2 />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="Repository" withArrow>
						<ActionIcon
							variant="default"
							component={Link}
							to="https://github.com/willpinha/react-computer"
						>
							<IconBrandGithub />
						</ActionIcon>
					</Tooltip>
					<SearchCategoriesButton />
					<ThemeButton />
				</Group>
			</Stack>

			<Group justify="center">
				{Object.entries(wiki).map(([category, components]) => (
					<Button
						key={category}
						leftSection={<IconHash size={20} />}
						rightSection={
							<Text inherit c="dimmed" size="xs">
								{Object.keys(components).length}
							</Text>
						}
						variant="default"
						radius="lg"
						component={Link}
						to={`/categories/${category}`}
					>
						{category}
					</Button>
				))}
			</Group>
		</Stack>
	);
}
