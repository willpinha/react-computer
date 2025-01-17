import { useQuery } from "@tanstack/react-query";
import { wait } from "../../lib/wait";
import { loadWikiComponent, WikiComponent } from "../../lib/wiki";

export function useLoadedWikiComponent(component: WikiComponent) {
	return useQuery({
		queryKey: ["wiki-component", component],
		queryFn: async () => {
			await wait(500); // Simulate loading time

			return await loadWikiComponent(component);
		},
	});
}
