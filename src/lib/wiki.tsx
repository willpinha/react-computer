import { ReactNode } from "react";

export type IndexModule = () => Promise<{ Index: () => ReactNode }>;

export type Wiki = {
	[category: string]: {
		[component: string]: IndexModule;
	};
};

export function buildWiki(): Wiki {
	const wiki: Wiki = {};

	const modules = import.meta.glob("../wiki/**/**/Index.tsx");

	for (const path in modules) {
		const [category, component] = extractCategoryAndComponentNames(path);

		if (!wiki[category]) {
			wiki[category] = {};
		}

		wiki[category][component] = modules[path] as IndexModule;
	}

	return wiki;
}

/**
 * @example extractCategoryAndComponentNames("../wiki/button/HelloWorld/Index.tsx")
 * // ["button", "HelloWorld"]
 */
function extractCategoryAndComponentNames(
	filepath: string
): [category: string, component: string] {
	const parts = filepath.split("/");

	const category = parts[2];

	const component = parts[3];

	return [category, component];
}

export const wiki = buildWiki();
