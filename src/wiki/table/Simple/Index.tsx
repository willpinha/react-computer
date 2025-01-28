import { Paper, Table } from "@mantine/core";
import { data } from "./data";

export function Index() {
	return (
		<Table.ScrollContainer minWidth={500}>
			<Paper withBorder>
				<Table>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Full name</Table.Th>
							<Table.Th>Email</Table.Th>
							<Table.Th>Phone</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{data.map((item) => (
							<Table.Tr key={item.email}>
								<Table.Td>{item.fullName}</Table.Td>
								<Table.Td>{item.email}</Table.Td>
								<Table.Td>{item.phone}</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</Paper>
		</Table.ScrollContainer>
	);
}
