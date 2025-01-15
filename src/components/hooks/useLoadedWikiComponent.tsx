import { useQuery } from "@tanstack/react-query";
import { loadWikiComponent, WikiComponent } from "../../lib/wiki";

export function useLoadedWikiComponent(component: WikiComponent) {
	return useQuery({
		queryKey: ["wiki-component", component],
		queryFn: async () => await loadWikiComponent(component),
	});
}
