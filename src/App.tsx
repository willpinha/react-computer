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

import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Route, Routes } from "react-router";
import { HomePage } from "./components/pages/HomePage";

function App() {
	return (
		<MantineProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
				</Routes>
			</BrowserRouter>
		</MantineProvider>
	);
}

export default App;
