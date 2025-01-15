import {
	AppShell,
	Button,
	Container,
	Group,
	Stack,
	Title,
} from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useParams } from "react-router";
import { isCategoryName } from "../../lib/categories";
import { filterWikiByCategory } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/LoadedWikiComponent";
import classes from "./CategoryPage.module.css";

export function CategoryPage() {
	const { categoryName } = useParams();

	if (!isCategoryName(categoryName)) {
		return <div>Invalid category name</div>;
	}

	const filteredWiki = filterWikiByCategory(categoryName);

	return (
		<AppShell py="md" header={{ height: 55 }}>
			<AppShell.Header className={classes.header} p="xs">
				<Group h="100%" justify="space-between">
					<Button
						variant="subtle"
						color="gray"
						leftSection={<IconArrowLeft size={20} />}
						component={Link}
						to="/"
					>
						Go back
					</Button>
				</Group>
			</AppShell.Header>
			<AppShell.Main>
				<Container size="xl">
					<Stack gap="xl">
						<Title>Button</Title>

						{Object.entries(filteredWiki).map(
							([timestamp, component]) => (
								<WikiComponentView
									key={timestamp}
									component={component}
								/>
							)
						)}
					</Stack>
				</Container>
			</AppShell.Main>
		</AppShell>
	);
}
