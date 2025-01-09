import { wikiComponents } from "../../lib/wiki";

export function HomePage() {
	console.log(wikiComponents);

	return wikiComponents[0].node;
}
