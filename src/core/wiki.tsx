import { ReactNode } from "react";

export function getTimestamps(): string[] {
	return [];
}

export function validateTimestamp(timestamp: string) {
	throw new Error(`Invalid timestamp ${timestamp}`);
}

export function timestampExists(timestamp: string): boolean {
	return false;
}

type Metadata = {
	name: string;
	categorySlug: string;
	description: string | null;
};

type TimestampModules = {
	metadata: () => Promise<{ metadata: Metadata }>;
	entrypoint: {
		Index: () => Promise<{ Index: () => ReactNode }>;
		content: () => Promise<{ default: string }>;
	};
	files: {
		filename: string;
		content: () => Promise<{ default: string }>;
	}[];
};

export function getTimestampModules(timestamp: string): TimestampModules {
	return {} as unknown as TimestampModules;
}

type LoadedTimestampModules = {
	metadata: Metadata;
	entrypoint: {
		Index: () => ReactNode;
		content: string;
	};
	files: {
		filename: string;
		content: string;
	}[];
};

export async function loadTimestampModules(
	modules: TimestampModules
): Promise<LoadedTimestampModules> {
	return {} as unknown as Promise<LoadedTimestampModules>;
}

export function validateLoadedTimestampModules(
	loadedModules: LoadedTimestampModules
) {
	throw new Error("Invalid timestamp modules");
}

export async function loadAllTimestampModules(): Promise<
	LoadedTimestampModules[]
> {
	return [];
}

/**
 * Testes:
 *
 * - Se todos os timestamps são válidos
 * - Se todos os módulos de todos os timestamps são carregados corretamente
 */

export const timestamps = getTimestamps();
