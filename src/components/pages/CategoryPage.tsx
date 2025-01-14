import { useParams } from "react-router";
import { CategoryName } from "../../lib/categories";
import { filterWikiByCategory } from "../../lib/wiki";

export function CategoryPage() {
	const { categoryName } = useParams();

	if (!categoryName) {
		return "Category not found";
	}

	const filteredWiki = filterWikiByCategory(categoryName as CategoryName);

	return (
		<>
			{Object.entries(filteredWiki).map(([x, y]) => (
				<div key={x}>
					<h1>{y.metadata.name}</h1>
					<p>{y.metadata.category}</p>
				</div>
			))}
		</>
	);
}
