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

import {
	Alert,
	Button,
	Container,
	createTheme,
	Group,
	MantineProvider,
	Stack,
	Text,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { IconRefresh } from "@tabler/icons-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { HashRouter, Route, Routes, useNavigate } from "react-router";
import { CategoryPage } from "./components/pages/CategoryPage";
import { HomePage } from "./components/pages/HomePage";
import { NotFoundPage } from "./components/pages/NotFoundPage";
import { queryClient } from "./lib/query";

const theme = createTheme({
	primaryColor: "green",
});

function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
	return (
		<Container p="md">
			<Alert color="red" title="Something went wrong">
				<Stack>
					<Text inherit>{error.message}</Text>
					<Group justify="end">
						<Button
							color="red"
							variant="outline"
							leftSection={<IconRefresh size={20} />}
							onClick={resetErrorBoundary}
						>
							Retry
						</Button>
					</Group>
				</Stack>
			</Alert>
		</Container>
	);
}

function CustomErrorBoundary({ children }: { children: ReactNode }) {
	const navigate = useNavigate();

	return (
		<ErrorBoundary
			FallbackComponent={ErrorBoundaryFallback}
			onReset={() => navigate(0)}
		>
			{children}
		</ErrorBoundary>
	);
}

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<MantineProvider theme={theme} defaultColorScheme="dark">
				<HashRouter>
					<CustomErrorBoundary>
						<Routes>
							<Route path="*" element={<NotFoundPage />} />
							<Route path="/" element={<HomePage />} />
							<Route
								path="/categories/:category"
								element={<CategoryPage />}
							/>
						</Routes>
					</CustomErrorBoundary>
				</HashRouter>
				<Notifications />
			</MantineProvider>
		</QueryClientProvider>
	);
}

export default App;
