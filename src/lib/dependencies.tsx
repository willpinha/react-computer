import { z } from "zod";

export const dependencySchema = z.object({
	name: z.string(),
	link: z.string().url(),
});

/**
 * Define here all dependencies that can be used in the project
 */
export const dependencies = [
	{
		name: "@tanstack/table",
		link: "https://tanstack.com/",
	},
] as const;

await z.array(dependencySchema).parseAsync(dependencies);

export function getDependency(name: DependencyName): Dependency {
	return dependencies.find((dep) => dep.name === name) as Dependency;
}
