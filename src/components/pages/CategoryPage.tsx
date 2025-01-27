import { Stack } from "@mantine/core";
import { useParams } from "react-router";
import { wiki } from "../../lib/wiki";
import { WikiComponentView } from "../wiki/WikiComponentView";

export function CategoryPage() {
	const { category } = useParams();

	if (!category || !wiki[category]) {
		return "Category not found";
	}

	return (
		<Stack p="xs">
			{Object.entries(wiki[category]).map(
				([componentName, component]) => (
					<WikiComponentView
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
