import { ReactNode } from "react";

type IndexModule = () => Promise<{ Index: () => ReactNode }>;

type ContentModule = () => Promise<{ default: string }>;

type File = {
	name: string;
	content: ContentModule;
};

type LoadedFile = {
	name: string;
	content: string;
};

export type WikiComponent = {
	indexModule: IndexModule;
	indexContent: ContentModule;
	files: File[];
};

type LoadedWikiComponent = {
	Index: () => ReactNode;
	indexContent: string;
	files: LoadedFile[];
};

type Wiki = {
	[category: string]: {
		[component: string]: WikiComponent;
	};
};

function buildWiki(): Wiki {
	const wiki: Wiki = {};

	const indexModules = import.meta.glob("../wiki/**/Index.tsx");
	const indexContentModules = import.meta.glob("../wiki/**/Index.tsx", {
		query: "?raw",
	});
	const filesModules = import.meta.glob(
		["../wiki/**/*.{tsx,module.css}", "!**/Index.tsx"],
		{
			query: "?raw",
		}
	);

	for (const [path, indexModule] of Object.entries(indexModules)) {
		const [category, component] = extractCategoryAndComponentNames(path);

		if (!wiki[category]) {
			wiki[category] = {};
		}

		const files = Object.entries(filesModules).reduce(
			(acc, [filePath, contentModule]) => {
				if (filePath.includes(`${category}/${component}`)) {
					acc.push({
						name: extractFileName(filePath),
						content: contentModule as ContentModule,
					});
				}

				return acc;
			},
			[] as File[]
		);

		wiki[category][component] = {
			indexModule: indexModule as IndexModule,
			indexContent: indexContentModules[path] as ContentModule,
			files,
		};
	}

	return wiki;
}

export async function loadWikiComponent(
	component: WikiComponent
): Promise<LoadedWikiComponent> {
	const Index = (await component.indexModule()).Index;

	const indexContent = (await component.indexContent()).default;

	const files = await Promise.all(
		component.files.map(async (file) => {
			const content = await file.content();
			return {
				name: file.name,
				content: content.default,
			};
		})
	);

	return {
		Index,
		indexContent,
		files,
	};
}

/**
 * @example extractCategoryAndComponentNames("../wiki/button/HelloWorld/Index.tsx")
 * // ["button", "HelloWorld"]
 */
function extractCategoryAndComponentNames(
	filepath: string
): [category: string, component: string, filename: string] {
	const parts = filepath.split("/");

	const category = parts[2];

	const component = parts[3];

	const filename = parts[4];

	return [category, component, filename];
}

/**
 * @example extractFileName("../wiki/button/HelloWorld/Index.tsx")
 * // "Index.tsx"
 */
function extractFileName(filepath: string): string {
	return filepath.split("/").pop()!;
}

export const wiki = buildWiki();
