import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { wiki } from "../../lib/wiki";

export function WikiComponent() {
	const { timestamp } = useParams();
	const query = useQuery({
		queryKey: ["wiki-component", timestamp],
		queryFn: async () => {
			const wikiTarget = wiki[timestamp!];

			if (!wikiTarget) {
				return null;
			}

			const { Index } = await wikiTarget.index.nodeModule();

			return Index();
		},
		enabled: !!timestamp,
	});

	if (query.isLoading) {
		return "Loading...";
	}

	return query.data;
}
