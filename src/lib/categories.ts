export const categories = [
	{
		slug: "button",
		name: "Button",
		icon: "✨",
		iconColor: "blue",
	},
] as const;

export type CategoryName = (typeof categories)[number]["slug"];
