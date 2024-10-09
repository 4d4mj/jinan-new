const Semester = () => {
	const campus = "tripoli";

	return (
		<div className="bg-dark rounded-xl p-4 text-white flex flex-col justify-between">
			<div className="flex flex-col gap-2 capitalize">
				<div>
					<p className="text-sm font-medium opacity-60">
						{campus} &bull; current
					</p>
					<h1 className="font-medium text-xl text-yellow">
						fall 2024 - 2025
					</h1>
				</div>
				<div className="flex justify-between">
					<div className="stack">
						<p>start date</p>
						<p>20/10/2021</p>
					</div>
					<div className="stack">
						<p>end date</p>
						<p>20/10/2021</p>
					</div>
				</div>
				<div className="stack">
					<p>status</p>
					<p>pre-registration</p>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<div className="flex gap-2">
					<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm flex-1">
						course offering
					</button>
					<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm flex-1">
						payment due dates
					</button>
				</div>
				<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm">
					register
					<i className="material-symbols-outlined small">login</i>
				</button>
			</div>
		</div>
	);
};

export default Semester;
