import { Checkbox, CheckboxProps } from "@mantine/core";
import { IconUserFilled, IconUserMinus } from "@tabler/icons-react";

export function Index() {
	const Icon: CheckboxProps["icon"] = ({ indeterminate, ...props }) =>
		indeterminate ? (
			<IconUserMinus {...props} />
		) : (
			<IconUserFilled {...props} />
		);

	return <Checkbox icon={Icon} defaultChecked />;
}
