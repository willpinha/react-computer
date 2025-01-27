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
import { QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router";
import { CategoryPage } from "./components/pages/CategoryPage";
import { HomePage } from "./components/pages/HomePage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { queryClient } from "./lib/query";

const theme = createTheme({
	primaryColor: "green",
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<HashRouter>
					<Routes>
						<Route path="*" element={<NotFoundPage />} />
						<Route path="/" element={<HomePage />} />
						<Route
							path="/categories/:category"
							element={<CategoryPage />}
						/>
					</Routes>
				</HashRouter>
				<Notifications />
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
