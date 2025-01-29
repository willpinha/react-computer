import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export function Index() {
	const [opened, { open, close }] = useDisclosure();

	return (
		<>
			<Button onClick={open}>Open</Button>

			<Modal opened={opened} onClose={close} title="Title">
				This is a simple description of the modal
			</Modal>
		</>
	);
}
