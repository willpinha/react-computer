import { ActionIcon, CopyButton, Tooltip } from "@mantine/core";
import { IconCopy, IconCopyCheck } from "@tabler/icons-react";

type CopyIconButtonProps = {
	name: string;
	value: string;
};

export function CopyIconButton({ name, value }: CopyIconButtonProps) {
	return (
		<CopyButton value={value}>
			{({ copied, copy }) => (
				<Tooltip label={copied ? "Copied!" : `Copy ${name}`}>
					<ActionIcon
						size="xs"
						radius="lg"
						variant={copied ? "light" : "subtle"}
						color={copied ? "teal" : "gray"}
						onClick={copy}
					>
						{copied ? <IconCopyCheck /> : <IconCopy />}
					</ActionIcon>
				</Tooltip>
			)}
		</CopyButton>
	);
}
