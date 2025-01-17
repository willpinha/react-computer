import { IconRadio } from "@tabler/icons-react";
import z from "zod";
import { dependencySchema, getDependency } from "./dependencies";

export const categorySchema = z.object({
	name: z.string(),
	icon: z.object({}),
	color: z.string(),
	dependencies: z.array(dependencySchema).optional(),
});

/**
 * Define here all categories that can be used in the project
 */
export const categories = [
	{
		name: "radio",
		icon: <IconRadio />,
		color: "blue",
		dependencies: [getDependency("@tanstack/table")],
	},
] as const;

await z.array(categorySchema).parseAsync(categories);

export function getCategory(categoryName?: string): Category {
	const error = new Error("Category not found");

	if (!categoryName) {
		throw error;
	}

	const category = categories.find(
		(category) => category.name === categoryName
	);

	if (!category) {
		throw error;
	}

	return category;
}
