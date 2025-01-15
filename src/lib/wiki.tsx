import { ReactNode } from "react";
import { CategoryName } from "./categories";

export type Metadata = {
	name: string;
	category: CategoryName;
};

type IndexModule = () => Promise<{ Index: () => ReactNode }>;

type ContentModule = () => Promise<{ default: string }>;

export type WikiComponent = {
	metadata: Metadata;
	index: {
		nodeModule: IndexModule;
		contentModule: ContentModule;
	};
	files: {
		filename: string;
		contentModule: ContentModule;
	}[];
};

export type LoadedWikiComponent = {
	metadata: Metadata;
	index: {
		node: ReactNode;
		content: string;
	};
	files: {
		filename: string;
		content: string;
	}[];
};

type Wiki = {
	[timestamp: string]: WikiComponent;
};

export async function loadWikiComponent(
	component: WikiComponent
): Promise<LoadedWikiComponent> {
	const index = {
		node: (await component.index.nodeModule()).Index(),
		content: (await component.index.contentModule()).default,
	};

	const files = await Promise.all(
		component.files.map(async (file) => {
			const content = await file.contentModule();
			return { filename: file.filename, content: content.default };
		})
	);

	return {
		metadata: component.metadata,
		index,
		files,
	};
}

async function buildWiki(): Promise<Wiki> {
	const wiki: Wiki = {};

	const indexModules = import.meta.glob("../wiki/**/Index.tsx");
	const indexContentModules = import.meta.glob("../wiki/**/Index.tsx", {
		query: "?raw",
	});
	// const filesModules = import.meta.glob(
	// 	["../wiki/**/*.{tsx,module.css}", "!**/Index.tsx"],
	// 	{
	// 		query: "?raw",
	// 	}
	// );
	const metadataModules = import.meta.glob("../wiki/**/metadata.ts");

	for (const [path, nodeModule] of Object.entries(indexModules)) {
		const timestamp = extractTimestampFromPath(path);

		const metadataModule =
			metadataModules[`../wiki/${timestamp}/metadata.ts`]();

		const metadata = ((await metadataModule) as { metadata: Metadata })
			.metadata;

		const contentModule = indexContentModules[path] as ContentModule;

		wiki[timestamp] = {
			metadata,
			index: {
				nodeModule: nodeModule as IndexModule,
				contentModule,
			},
			files: [],
		};
	}

	return wiki;
}

function extractTimestampFromPath(path: string): string {
	return path.split("/")[2];
}

export const wiki = await buildWiki();

export function filterWikiByCategory(category: CategoryName): Wiki {
	const filteredWiki: Wiki = {};

	for (const [timestamp, data] of Object.entries(wiki)) {
		if (data.metadata.category === category) {
			filteredWiki[timestamp] = data;
		}
	}

	return filteredWiki;
}
