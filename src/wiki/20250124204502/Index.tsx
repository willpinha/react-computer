import { Button, ThemeIcon } from "@mantine/core";
import { IconStar, IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";

export function Index() {
	const [starred, setStarred] = useState(false);

	return (
		<Button
			onClick={() => setStarred((prev) => !prev)}
			leftSection={
				<ThemeIcon color={starred ? "yellow" : "gray"}>
					{starred ? <IconStarFilled /> : <IconStar />}
				</ThemeIcon>
			}
		>
			{starred ? "Starred" : "Star"}
		</Button>
	);
}
