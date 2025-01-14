import { RadioIcon } from "@mantine/core";

export const categories = [
	{ name: "radio", icon: <RadioIcon />, color: "blue" },
] as const;

export type CategoryName = (typeof categories)[number]["name"];
