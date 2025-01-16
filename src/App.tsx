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
import { QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import { CategoryPage } from "./components/pages/CategoryPage";
import HomePage from "./components/pages/HomePage";
import { queryClient } from "./lib/query";

const theme = createTheme({
	primaryColor: "green",
});

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme}>
				<Suspense fallback={<div>Loading...</div>}>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<HomePage />} />
							<Route
								path="/categories/:categoryName"
								element={<CategoryPage />}
							/>
						</Routes>
					</BrowserRouter>
				</Suspense>
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
