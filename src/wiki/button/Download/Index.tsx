import { Button, ThemeIcon } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export function Index() {
	return (
		<Button
			color="violet"
			leftSection={
				<ThemeIcon variant="transparent" size="sm" color="gray">
					<IconDownload />
				</ThemeIcon>
			}
		>
			Download
		</Button>
	);
}
