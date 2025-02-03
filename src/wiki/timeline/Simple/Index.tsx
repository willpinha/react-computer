import { Timeline } from "@mantine/core";

export function Index() {
	return (
		<Timeline active={1}>
			<Timeline.Item title="First event">
				First event description
			</Timeline.Item>
			<Timeline.Item title="Second event">
				Second event description
			</Timeline.Item>
			<Timeline.Item title="Third event">
				Third event description
			</Timeline.Item>
			<Timeline.Item title="Fourth event">
				Fourth event description
			</Timeline.Item>
		</Timeline>
	);
}
