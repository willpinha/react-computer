import "@mantine/core/styles.css";

import "@mantine/carousel/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import "@mantine/spotlight/styles.css";
import "@mantine/tiptap/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
	Spotlight,
	SpotlightActionData,
	SpotlightActionGroupData,
} from "@mantine/spotlight";
import { IconSearch } from "@tabler/icons-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useNavigate } from "react-router";
import { KeyboardShortcutsProvider } from "./components/hooks/useKeyboardShortcuts";
import { CategoryPage } from "./components/pages/CategoryPage";
import { CodePage } from "./components/pages/CodePage";
import HomePage from "./components/pages/HomePage";
import { categories } from "./lib/categories";
import { queryClient } from "./lib/query";
import { wiki } from "./lib/wiki";

const theme = createTheme({
	primaryColor: "green",
});

function SearchSpotlight() {
	const navigate = useNavigate();

	const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
		{
			group: "Categories",
			actions: categories.map((category) => ({
				id: category.name,
				label: category.name,
				leftSection: category.icon,
				onClick: () => navigate(`/categories/${category.name}`),
			})),
		},
		{
			group: "Components",
			actions: Object.entries(wiki).map(([timestamp, component]) => ({
				id: timestamp,
				label: component.metadata.name,
				description: `Timestamp ${timestamp}`,
				onClick: () =>
					navigate(
						`/categories/${component.metadata.category}#${timestamp}`
					),
			})),
		},
	];

	return (
		<>
			<Spotlight
				actions={actions}
				nothingFound="Nothing found..."
				highlightQuery
				searchProps={{
					leftSection: <IconSearch />,
					placeholder: "Find categories and components",
				}}
			/>
		</>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<HashRouter>
					<KeyboardShortcutsProvider>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route
								path="/categories/:categoryName"
								element={<CategoryPage />}
							/>
							<Route
								path="/code/:timestamp"
								element={<CodePage />}
							/>
						</Routes>

						<SearchSpotlight />
					</KeyboardShortcutsProvider>
				</HashRouter>
				<Notifications />
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
