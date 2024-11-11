export default function Transferred({ transferred, totaltransfer }) {
	return (
		<div>
			<table className="w-full">
				{/* header */}
				<thead className="bg-dark text-white">
					<tr className="capitalize text-lg text-yellow">
						<th
							colSpan="4"
							className="pt-2 font-medium rounded-t-xl"
						>
							Transferred Courses
						</th>
					</tr>
					<tr className="opacity-50 text-xs text-left relative capitalize">
						<th width="15%" className="px-2 pb-2 font-medium">
							code
						</th>
						<th width="55%" className="px-2 pb-2 font-medium">
							title
						</th>
						<th width="15%" className="px-2 pb-2 font-medium">
							credits
						</th>
						<th width="15%" className="px-2 pb-2 font-medium">
							university
						</th>
					</tr>
				</thead>
				{/* courses */}
				<tbody className="text-sm font-medium text-dark">
					{transferred.map((course, index) => (
						<tr
							key={course.code}
							className={`${
								index % 2 === 0 ? "bg-darkt" : "bg-white"
							}`}
						>
							<td className="p-2">{course.code}</td>
							<td className="p-2">{course.name}</td>
							<td className="p-2">{course.credits}</td>
							<td></td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td className="rounded-bl-xl"></td>
						<td className="p-2 font-medium">total</td>
						<td className="p-2">{totaltransfer}</td>
						<td className="rounded-br-xl"></td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
