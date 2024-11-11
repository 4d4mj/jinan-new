export default function Curriculum({ title, details}) {
	return (
		<div>
			<table className="w-full">
				{/* header */}
				<thead className="bg-dark text-white">
					<tr className="capitalize text-lg text-yellow">
						<th
							colSpan="5"
							className="pt-2 font-medium rounded-t-xl"
						>
							{title}
						</th>
					</tr>
					<tr className="opacity-50 text-xs text-left relative capitalize">
						<th width="15%" className="px-2 pb-2 font-medium"></th>
						<th className="px-2 pb-2 font-medium">Title</th>
						<th width="15%" className="px-2 pb-2 font-medium">
							amount
						</th>
						<th width="15%" className="px-2 pb-2 font-medium"></th>
					</tr>
				</thead>
				{/* courses */}
				<tbody className="text-sm font-medium text-dark">
					{details.map((detail, index) => (
						<tr
							key={detail.id}
							className={`${
								index % 2 === 0 ? "bg-darkt" : "bg-white"
							}`}
						>
							<td className="p-2"></td>
							<td className="p-2">{detail.title}</td>
							<td className="p-2">{detail.amount}</td>
							<td className="p-2"></td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td className="p-2"></td>
						<td className="p-2 font-medium">total tuition</td>
						<td className="p-2">400</td>
						<td className="p-2"></td>
					</tr>
					<tr className="capitalize text-yellow bg-dark">
						<td className="p-2"></td>
						<td className="p-2 font-medium">total aid</td>
						<td className="p-2">400</td>
						<td className="p-2"></td>
					</tr>
					<tr className="capitalize text-yellow bg-dark">
						<td className="p-2"></td>
						<td className="p-2 font-medium">total paid</td>
						<td className="p-2">400</td>
						<td className="p-2"></td>
					</tr>
					<tr className="capitalize text-yellow bg-dark">
						<td className="p-2 rounded-bl-xl"></td>
						<td className="p-2 font-medium ">balance</td>
						<td className="p-2">400</td>
						<td className="p-2 rounded-br-xl"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
