import {
	ActionIcon,
	Badge,
	Group,
	Image,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import {
	IconBrandGithub,
	IconBrandOpenSource,
	IconHeartFilled,
	IconSearch,
	IconUsersGroup,
} from "@tabler/icons-react";
import { Link } from "react-router";
import { ThemeButton } from "../button/ThemeButton";

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

					<Text>
						You can find{" "}
						<Badge variant="outline" size="xs" component="span">
							2378
						</Badge>{" "}
						components in{" "}
						<Badge variant="outline" size="xs" component="span">
							60
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
					<Tooltip label="Contributors">
						<ActionIcon
							variant="default"
							component={Link}
							to="https://github.com/willpinha/react-computer/graphs/contributors"
						>
							<IconUsersGroup />
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
					<Tooltip label="Search categories" withArrow>
						<ActionIcon variant="default">
							<IconSearch />
						</ActionIcon>
					</Tooltip>
					<ThemeButton />
				</Group>
			</Stack>
		</Stack>
	);
}
