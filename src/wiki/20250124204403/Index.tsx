import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export function Index() {
	return (
		<Button leftSection={<IconDownload size={20} />} color="violet">
			Download
		</Button>
	);
}
