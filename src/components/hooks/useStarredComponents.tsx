import { useLocalStorage } from "@mantine/hooks";

export function useStarredComponents() {
	const [starred, setStarred] = useLocalStorage<string[]>({
		key: "starred-components",
		getInitialValueInEffect: false,
		defaultValue: [],
	});

	function isStarred(timestamp: string) {
		return starred.includes(timestamp);
	}

	function toggleStarred(timestamp: string) {
		if (isStarred(timestamp)) {
			setStarred(starred.filter((item) => item !== timestamp));
		} else {
			setStarred([...starred, timestamp]);
		}
	}

	function removeAllStarred() {
		setStarred([]);
	}

	return { starred, isStarred, toggleStarred, removeAllStarred };
}
