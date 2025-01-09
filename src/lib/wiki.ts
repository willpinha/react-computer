import { ReactNode } from "react";
import { CategoryName } from "./categories";
import { Metadata } from "./metadata";

type WikiComponentFile = {
	slug: string;
	content: string;
	type: "tsx" | "module.css";
};

type WikiComponent = {
	createdAt: Date;
	category: CategoryName;
	name: string;
	node: ReactNode;
	content: string;
	files: WikiComponentFile[];
};

export function buildWikiComponents(): WikiComponent[] {
	const wikiComponents = [] as WikiComponent[];

	return wikiComponents;
}

export function getComponentsForCategory(
	category: CategoryName
): WikiComponent[] {
	return wikiComponents.filter(
		(component) => component.category === category
	);
}

export class WikiBuilder {
	private modules: Record<string, unknown>;

	constructor() {
		this.modules = import.meta.glob("../wiki/**/*.{ts,tsx,module.css}", {
			eager: true,
		});
	}

	public async buildWikiComponents(): Promise<WikiComponent[]> {
		const wikiComponents = [] as WikiComponent[];

		const componentBuilder = new WikiComponentBuilder();

		for (const path in this.modules) {
			const module = this.modules[path];

			try {
				await componentBuilder.consumeModule(path, module);
			} catch (error) {
				if (error instanceof DifferentTimestampError) {
					wikiComponents.push(componentBuilder.build());
					componentBuilder.refresh();
					await componentBuilder.consumeModule(path, module);
				} else {
					throw error;
				}
			}
		}

		wikiComponents.push(componentBuilder.build());

		return wikiComponents;
	}
}

class DifferentTimestampError extends Error {
	constructor(path: string) {
		super(`Cannot consume module with different timestamp: ${path}`);
	}
}

export class WikiComponentBuilder {
	private createdAtTimestamp: string | null = null; // YYYYMMDDHHMMSS (UTC)
	private category: CategoryName | null = null;
	private name: string | null = null;
	private node: ReactNode | null = null;
	private content: string | null = null;
	private files: WikiComponentFile[] = [];

	public async consumeModule(path: string, module: unknown) {
		const timestampMatch = path.match(/^..\/wiki\/(\d{14})\/[^/]+$/);

		const timestamp = timestampMatch?.[1];

		if (timestamp === undefined) {
			throw new Error(`Could not extract timestamp from path: ${path}`);
		}

		if (this.createdAtTimestamp === null) {
			this.createdAtTimestamp = timestamp;
		} else if (this.createdAtTimestamp !== timestamp) {
			throw new DifferentTimestampError(path);
		}

		if (path.endsWith("Index.tsx")) {
			await this.consumeIndexModule(path, module);
		} else if (path.endsWith("metadata.ts")) {
			await this.consumeMetadataModule(module);
		} else if (path.endsWith(".tsx")) {
			await this.consumeTsxModule(path);
		} else if (path.endsWith(".module.css")) {
			await this.consumeCssModule(path);
		} else {
			throw new Error(`Unknown module type: ${path}`);
		}
	}

	private async consumeIndexModule(path: string, module: unknown) {
		if (this.node !== null) {
			throw new Error("Index module already consumed");
		}

		const content = (await import(`${path}?raw`)).default;

		const node = (module as { Index: () => ReactNode }).Index();

		this.node = node;
		this.content = content;
	}

	private async consumeMetadataModule(module: unknown) {
		const { category, name } = (module as { metadata: Metadata }).metadata;

		this.category = category;
		this.name = name;
	}

	private async consumeTsxModule(path: string) {
		const content = (await import(`${path}?raw`)).default;

		this.files.push({
			slug: this.extractSlug(path),
			content,
			type: "tsx",
		});
	}

	private async consumeCssModule(path: string) {
		const content = (await import(`${path}?raw`)).default;

		this.files.push({
			slug: this.extractSlug(path),
			content,
			type: "module.css",
		});
	}

	private extractSlug(path: string) {
		const slugMatch = path.match(
			/^..\/wiki\/\d{14}\/([^/]+)\.(tsx|module\.css)$/
		);

		const slug = slugMatch?.[1];

		if (slug === undefined) {
			throw new Error(`Could not extract slug from path: ${path}`);
		}

		return slug;
	}

	public build(): WikiComponent {
		for (const requiredField of [
			this.createdAtTimestamp,
			this.category,
			this.name,
			this.node,
		]) {
			if (requiredField == null) {
				console.log(this);

				throw new Error(
					`Could not build WikiComponent ${this.createdAtTimestamp}`
				);
			}
		}

		return {
			createdAt: this.createdAt,
			category: this.category,
			name: this.name,
			node: this.node,
			content: this.content,
			files: this.files,
		} as WikiComponent;
	}

	private get createdAt(): Date {
		if (this.createdAtTimestamp === null) {
			throw new Error("Cannot get createdAt without createdAtTimestamp");
		}

		const year = this.createdAtTimestamp.slice(0, 4);
		const month = this.createdAtTimestamp.slice(4, 6);
		const day = this.createdAtTimestamp.slice(6, 8);
		const hours = this.createdAtTimestamp.slice(8, 10);
		const minutes = this.createdAtTimestamp.slice(10, 12);
		const seconds = this.createdAtTimestamp.slice(12, 14);

		return new Date(
			`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`
		);
	}

	public refresh() {
		this.createdAtTimestamp = null;
		this.category = null;
		this.name = null;
		this.node = null;
		this.files = [];
	}
}

export const wikiComponents = await new WikiBuilder().buildWikiComponents();
