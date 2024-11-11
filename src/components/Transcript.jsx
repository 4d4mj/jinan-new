export default function Transcript({ semester }) {
	const current = semester.current; // Accessing the first item in the current array
	const cumulative = semester.cumulative; // Accessing the first item in the cumulative array

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
							{semester.title}
						</th>
					</tr>
					<tr className="opacity-50 text-xs text-left relative">
						<th width="15%" className="px-2 pb-2 font-medium">Code</th>
						<th width="55%" className="px-2 pb-2 font-medium">Title</th>
						<th width="15%" className="px-2 pb-2 font-medium">Credits</th>
						<th width="15%" className="px-2 pb-2 font-medium">Grade</th>
					</tr>
				</thead>
				{/* courses */}
				<tbody className="text-sm font-medium text-dark">
					{semester.courses.map((course, index) => (
						<tr
							key={course.code}
							className={`${
								index % 2 === 0 ? "bg-darkt" : "bg-white"
							}`}
						>
							<td className="p-2">{course.code}</td>
							<td className="p-2">{course.name}</td>
							<td className="p-2">{course.credits}</td>
							<td className="p-2">
								{course.average} {current.grade ? `• ${current.grade} passed` : null}
							</td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td></td>
						<td className="p-2 font-medium">current</td>
						<td className="p-2">
							{current.attempted} {current.passed ? `(${current.passed} passed)` : null}
						</td>
						<td className="p-2">
							{current.average}
						</td>
					</tr>
					<tr className="capitalize text-yellow bg-dark">
						<td className="rounded-bl-xl"></td>
						<td className="p-2 font-medium">cumulative</td>
						<td className="p-2">
						{cumulative.attempted} {cumulative.passed ? `(${cumulative.passed} passed)` : null}
						</td>
						<td className="p-2 rounded-br-xl">
							{cumulative.average}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
