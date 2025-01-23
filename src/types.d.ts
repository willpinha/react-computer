import { categories } from "./lib/categories";
import { dependencies } from "./lib/dependencies";

declare global {
	export type Category = (typeof categories)[number];

	export type CategoryName = Category["slug"];

	export type Dependency = (typeof dependencies)[number];

	export type DependencyName = Dependency["name"];
}
