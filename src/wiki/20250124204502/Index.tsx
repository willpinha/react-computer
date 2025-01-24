import { Button, ThemeIcon } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

export function Index() {
	const [starred, setStarred] = useState(false);

	function handleStarClick() {
		setStarred((prev) => !prev);
	}

	return (
		<Button
			variant="default"
			onClick={handleStarClick}
			leftSection={
				<ThemeIcon
					variant="transparent"
					color={starred ? "yellow" : "gray"}
					size="sm"
				>
					{starred ? <IconStarFilled /> : <IconStar />}
				</ThemeIcon>
			}
		>
			{starred ? "Starred" : "Star"}
		</Button>
	);
}
