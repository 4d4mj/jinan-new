const Profile = () => {
	const name = "John Doe";
	const id = "1234567890";
	const campus = "Lagos";
	const major = "Computer Science";
	const semesters = ["2021/2022", "2022/2023", "2023/2024", "2024/2025"];

	return (
		<div className="flex flex-col gap-4 w-[24rem]">
			{/* user info */}
			<div className="flex p-4 bg-darkt rounded-xl gap-4">
				<div className="bg-blue-400 w-24 h-24 rounded-md"></div>
				<div className="flex flex-col justify-between">
					<div>
						<p className="text-lg font-semibold">{name}</p>
						<p className="text-md font-medium">{id}</p>
					</div>
					<div>
						<p className="text-sm font-semibold text-dark flex gap-1 items-center">
							<i className="material-symbols-outlined tiny">
								school
							</i>
							{major}
						</p>
						<p className="text-sm font-semibold text-dark flex gap-1 items-center">
							<i className="material-symbols-outlined tiny">
								location_on
							</i>
							{campus}
						</p>
					</div>
				</div>
			</div>
			{/* semester */}
			<div className="flex flex-col p-4 bg-darkt rounded-xl">
				<div className="flex gap-2 mb-4">
					<div className="flex-grow relative">
						<select className=" text-white appearance-none w-full bg-light px-4 py-2 rounded-lg shadow outline-none border-none relative">
							{semesters.map((option, index) => (
								<option
									key={index}
									value={option.value}
									className="text-white bg-dark"
								>
									hello
								</option>
							))}
						</select>
						<i className="material-symbols-outlined pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white z-10">
							keyboard_arrow_down
						</i>
					</div>
					<button className="icon">
						<i className="material-symbols-outlined outlined">
							calendar_month
						</i>
					</button>
				</div>
				<h2 className="capitalize font-semibold text-lg mb-2">
					this semester
				</h2>
				<div className="flex justify-between font-semibold">
					<div className="stack">
						<p>average</p>
						<p className="text-dark">3.5</p>
					</div>
					<div className="stack">
						<p>average</p>
						<p className="text-dark">3.5</p>
					</div>
					<div className="stack">
						<p>average</p>
						<p className="text-dark">3.5</p>
					</div>
				</div>
			</div>
			{/* payments */}
			<div className="flex flex-col p-4 bg-darkt rounded-xl flex-grow">
				<div className="flex justify-between">
					<h2 className="capitalize font-semibold text-lg">
						next due vouchers
					</h2>
					<button className="icon">
						<i className="material-symbols-outlined small outlined flex-shrink">
						attach_money
						</i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
