export default function Curriculum() {
	const type = "general education requirements";
	const courses = [
		{
			id: 1,
			code: "CSC 101",
			title: "Introduction to Computer Science",
			credits: 3,
			semester: "fall 2024",
			grade: "A",
		},
		{
			id: 2,
			code: "MTH 101",
			title: "Calculus I",
			credits: 3,
			semester: "fall 2024",
			grade: "B",
		},
		{
			id: 3,
			code: "PHY 101",
			title: "Physics I",
			credits: 3,
			semester: "fall 2024",
			grade: "C",
		},
		{
			id: 4,
			code: "ENG 101",
			title: "English Composition",
			credits: 3,
			semester: "fall 2024",
			grade: "A",
		},
		{
			id: 5,
			code: "CSC 102",
			title: "Data Structures",
			credits: 3,
			semester: "fall 2024",
			grade: "A",
		},
		{
			id: 6,
			code: "MTH 102",
			title: "Calculus II",
			credits: 3,
			semester: "fall 2024",
			grade: "B",
		},
		{
			id: 7,
			code: "PHY 102",
			title: "Physics II",
			credits: 3,
			semester: "fall 2024",
			grade: "C",
		},
	];

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
							{type}
						</th>
					</tr>
					<tr className="opacity-50 text-xs text-left relative capitalize">
						<th className="px-2 pb-2 font-medium">Code</th>
						<th className="px-2 pb-2 font-medium">Title</th>
						<th className="px-2 pb-2 font-medium">Credits</th>
						<th className="px-2 pb-2 font-medium">semester</th>
						<th className="px-2 pb-2 font-medium">Grade</th>
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
							<td className={`p-2 `}>{course.grade}</td>
						</tr>
					))}
					{/* totals */}
					<tr className="capitalize text-yellow bg-dark">
						<td className="rounded-bl-xl"></td>
						<td
							className="p-2 font-medium "
						>
							cumulative
						</td>
						<td colSpan="3" className="p-2 rounded-br-xl">10</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
