import { Button } from "@mantine/core";
import { useState } from "react";

export function Message() {
	const [message, setMessage] = useState("Hello world");

	return (
		<>
			{message}
			<Button onClick={() => setMessage("Bye world")}>Say bye</Button>
		</>
	);
}
