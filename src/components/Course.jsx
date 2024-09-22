const Course = () => {
	return (
		<div className="flex flex-col bg-dark rounded-xl justify-between text-white p-3">
			<div className="flex justify-between text-sm uppercase font-medium opacity-60">
				<p>csc100</p>
				<p>general</p>
			</div>
			<h1 className="text-yellow text-lg font-medium">
				Course Name Here
			</h1>
			<div>
				<div className="flex justify-between mb-1">
					<div className="stack">
						<p>average</p>
						<p>3.5</p>
					</div>
					<div className="stack items-end">
						<p>average</p>
						<p>3.5</p>
					</div>
				</div>
				<div className="flex gap-2">
					<button className="bg-light flex-grow rounded-md text-sm font-medium">
						Evaluation
					</button>
					<button className="icon">
						<i className="material-symbols-outlined outlined small">
							info
						</i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Course;
