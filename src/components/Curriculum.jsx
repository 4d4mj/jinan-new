export default function Curriculum({title, courses, total}) {
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
						<th width="15%" className="px-2 pb-2 font-medium">Code</th>
						<th width="50%" className="px-2 pb-2 font-medium">Title</th>
						<th width="10%" className="px-2 pb-2 font-medium">Credits</th>
						<th width="25%" className="px-2 pb-2 font-medium">semester</th>
					</tr>
				</thead>
				{/* courses */}
				<tbody className="text-sm font-medium text-dark">
					{courses.map((course, index) => (
						<tr
							key={course.id}
							className={`${
								index % 2 === 0 ? "bg-darkt" : "bg-white"
							}`}
						>
							<td className={`p-2 `}>{course.code}</td>
							<td className="p-2">{course.title}</td>
							<td className="p-2">{course.credits}</td>
							<td className="p-2">{course.semester}</td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td className="rounded-bl-xl"></td>
						<td
							className="p-2 font-medium "
						>
							total
						</td>
						<td colSpan="3" className="p-2 rounded-br-xl">{total}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
