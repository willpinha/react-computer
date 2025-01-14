import { useSuspenseQuery } from "@tanstack/react-query";
import { wiki } from "../../lib/wiki";

export default function HomePage() {
	const nodeModule = wiki["20250109001000"].index.nodeModule();

	const { data } = useSuspenseQuery({
		queryKey: ["HomePage", "20250109001000"],
		queryFn: async () => {
			// await 1 sec
			await new Promise((resolve) => setTimeout(resolve, 3000));

			const { Index } = await nodeModule;
			return Index();
		},
	});

	return data;
}
