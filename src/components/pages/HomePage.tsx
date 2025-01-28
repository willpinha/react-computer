import {
	ActionIcon,
	Group,
	Image,
	Stack,
	Text,
	Title,
	Tooltip,
} from "@mantine/core";
import { IconBrandGithub, IconHeartFilled } from "@tabler/icons-react";
import { Link } from "react-router";
import { ThemeButton } from "../button/ThemeButton";

export function HomePage() {
	return (
		<Stack gap="xl" p="md" align="center">
			<Stack align="center" gap="xs">
				<Image src="/images/logo.svg" w={180} />

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

				<Group gap="xs">
					<Tooltip label="Sponsor">
						<ActionIcon color="red">
							<IconHeartFilled />
						</ActionIcon>
					</Tooltip>
					<Tooltip label="GitHub">
						<ActionIcon
							variant="default"
							component={Link}
							to="https://github.com/willpinha/react-computer"
						>
							<IconBrandGithub />
						</ActionIcon>
					</Tooltip>
					<ThemeButton />
				</Group>
			</Stack>
		</Stack>
	);
}
