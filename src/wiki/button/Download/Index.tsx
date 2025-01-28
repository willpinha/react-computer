import { Button } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";

export function Index() {
	return (
		<Button color="violet" leftSection={<IconDownload size={20} />}>
			Download
		</Button>
	);
}
