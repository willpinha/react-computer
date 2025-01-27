import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { IndexModule, wiki } from "../../lib/wiki";

type WikiComponentPreviewProps = {
	category: string;
	component: string;
	module: IndexModule;
};

function WikiComponentPreview({
	category,
	component,
	module,
}: WikiComponentPreviewProps) {
	const query = useQuery({
		queryKey: ["component", category, component],
		queryFn: async () => await module(),
	});

	if (query.isPending) {
		return "Loading...";
	}

	if (query.isError) {
		return "Error";
	}

	const { Index } = query.data;

	return <Index />;
}

export function CategoryPage() {
	const { category } = useParams();

	if (!category || !wiki[category]) {
		return "Category not found";
	}

	return (
		<Stack>
			{Object.entries(wiki[category]).map(([component, module]) => (
				<WikiComponentPreview
					key={component}
					category={category}
					component={component}
					module={module}
				/>
			))}
		</Stack>
	);
}
