import { IconAlertTriangle, IconHandClick } from "@tabler/icons-react";
import z from "zod";
import { dependencySchema } from "./dependencies";

export const categorySchema = z.object({
	name: z.string(),
	slug: z.string(),
	icon: z.object({}),
	color: z.string(),
	aliases: z.array(z.string()),
	dependencies: z.array(dependencySchema).optional(),
});

/**
 * Define here all categories that can be used in the project
 */
export const categories = [
	{
		name: "Alert",
		slug: "alert",
		icon: <IconAlertTriangle />,
		color: "yellow",
		aliases: ["success", "info", "error", "danger", "warning", "neutral"],
	},
	{
		name: "Button",
		slug: "button",
		icon: <IconHandClick />,
		color: "blue",
		aliases: [],
	},
] as const;

await z.array(categorySchema).parseAsync(categories);

export function getCategory(categorySlug?: string): Category {
	const error = new Error("Category not found");

	if (!categorySlug) {
		throw error;
	}

	const category = categories.find(
		(category) => category.slug === categorySlug
	);

	if (!category) {
		throw error;
	}

	return category;
}
