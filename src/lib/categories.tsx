import { RadioIcon } from "@mantine/core";

export const categories = [
	{ name: "radio", icon: <RadioIcon />, color: "blue" },
] as const;

export type CategoryName = (typeof categories)[number]["name"];

export function isCategoryName(name?: string): name is CategoryName {
	if (!name) {
		return false;
	}

	return categories.some((category) => category.name === name);
}
