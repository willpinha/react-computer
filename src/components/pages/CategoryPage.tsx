import { Stack } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { loadWikiComponent, wiki, WikiComponent } from "../../lib/wiki";

type LoadedWikiComponentProps = {
	category: string;
	componentName: string;
	component: WikiComponent;
};

function LoadedWikiComponent({
	category,
	componentName,
	component,
}: LoadedWikiComponentProps) {
	const query = useQuery({
		queryKey: ["component", category, componentName],
		queryFn: async () => await loadWikiComponent(component),
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
			{Object.entries(wiki[category]).map(
				([componentName, component]) => (
					<LoadedWikiComponent
						key={componentName}
						category={category}
						componentName={componentName}
						component={component}
					/>
				)
			)}
		</Stack>
	);
}
