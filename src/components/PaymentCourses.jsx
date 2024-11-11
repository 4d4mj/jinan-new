export default function Transcript({ title, courses}) {
	return (
		<div>
			<table className="w-full">
				{/* header */}
				<thead className="bg-dark text-white">
					<tr className="capitalize text-lg text-yellow">
						<th
							colSpan="6"
							className="pt-2 font-medium rounded-t-xl"
						>
							{title}
						</th>
					</tr>
					<tr className="opacity-50 text-xs text-left relative capitalize">
						<th width="10%" className="px-2 pb-2 font-medium">
							Code
						</th>
						<th width="50%" className="px-2 pb-2 font-medium">
							Title
						</th>
						<th width="10%" className="px-2 pb-2 font-medium">
							Credits
						</th>
						<th width="10%" className="px-2 pb-2 font-medium">
							fee
						</th>
						<th width="10%" className="px-2 pb-2 font-medium">
							net fee
						</th>
						<th width="10%" className="px-2 pb-2 font-medium">
							aid %
						</th>
					</tr>
				</thead>
				{/* courses */}
				<tbody className="text-sm font-medium text-dark">
					{courses.map((course, index) => (
						<tr
							key={course.code}
							className={`${
								index % 2 === 0 ? "bg-darkt" : "bg-white"
							}`}
						>
							<td className="p-2">{course.code}</td>
							<td className="p-2">{course.name}</td>
							<td className="p-2">{course.credits}</td>
							<td className="p-2">{course.fee}</td>
							<td className="p-2">{course.net_fee}</td>
							<td className="p-2">{course.aid}</td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td className="rounded-bl-xl"></td>
						<td className="p-2 font-medium">total</td>
						<td className="p-2">1</td>
						<td className="p-2">1</td>
						<td className="p-2">1</td>
						<td className="p-2 rounded-br-xl"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
