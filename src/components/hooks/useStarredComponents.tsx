import { useLocalStorage } from "@mantine/hooks";
import { wiki } from "../../lib/wiki";

export function useStarredComponents() {
	const [starred, setStarred] = useLocalStorage<string[]>({
		key: "starred-components",
		getInitialValueInEffect: false,
		defaultValue: [],
	});

	const onlyValidStarred = getOnlyValidStarred();

	function getOnlyValidStarred(timestamps = starred) {
		return Array.from(
			new Set(
				timestamps.filter((timestamp) => wiki[timestamp] !== undefined)
			)
		);
	}

	function isStarred(timestamp: string) {
		return onlyValidStarred.includes(timestamp);
	}

	function toggleStarred(timestamp: string) {
		if (isStarred(timestamp)) {
			setStarred(onlyValidStarred.filter((item) => item !== timestamp));
		} else {
			setStarred([...onlyValidStarred, timestamp]);
		}
	}

	function removeAllStarred() {
		setStarred([]);
	}

	function importStarred(timestamps: string[]) {
		setStarred(getOnlyValidStarred(timestamps));
	}

	return {
		starred: onlyValidStarred,
		isStarred,
		importStarred,
		toggleStarred,
		removeAllStarred,
	};
}
