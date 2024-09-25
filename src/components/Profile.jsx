import Image from "next/image";

const Profile = ({ profile, selectedSemester, setSelectedSemester, totalCredits, totalPassed, average }) => {
	console.log("Profile props:",  totalCredits, totalPassed, average );

	// Handle the change in semester
	const handleSemesterChange = (event) => {
		setSelectedSemester(event.target.value); // Update the selected semester
	};

	return (
		<div className="flex flex-col gap-4 min-w-[24rem]">
			{/* user info */}
			<div className="flex p-4 bg-darkt rounded-xl gap-4">
				<div className="bg-blue-400 w-24 h-24 rounded-md overflow-clip">
					<Image src={'/images/me.jpg'} alt={'profile'} width={200} height={200} />
				</div>
				<div className="flex flex-col justify-between">
					<div>
						<p className="text-lg font-semibold">{profile.name}</p>
						<p className="text-md font-medium">{profile.id}</p>
					</div>
					<div>
						<p className="text-sm font-semibold text-dark flex gap-1 items-center">
							<i className="material-symbols-outlined tiny">
								school
							</i>
							{profile.major}
						</p>
						<p className="text-sm font-semibold text-dark flex gap-1 items-center">
							<i className="material-symbols-outlined tiny">
								location_on
							</i>
							{profile.campus}
						</p>
					</div>
				</div>
			</div>
			{/* semester */}
			<div className="flex flex-col p-4 bg-darkt rounded-xl">
				<div className="flex gap-2 mb-4">
					<div className="flex-grow relative">
						<select
							value={selectedSemester} // Bind the selected semester
							onChange={handleSemesterChange} // Handle changes
							className="text-white appearance-none w-full bg-light px-4 py-2 rounded-lg shadow outline-none border-none relative"
						>
							{profile.semesters.map((option, index) => (
								<option
									key={index}
									value={option}
									className="text-white bg-dark"
								>
									{option}
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
					semester summary
				</h2>
				<div className="flex justify-between font-semibold">
					<div className="stack">
						<p>credits</p>
						<p className="text-dark">{totalCredits}</p>
					</div>
					<div className="stack">
						<p>passed</p>
						<p className="text-dark">{totalPassed}</p>
					</div>
					<div className="stack">
						<p>average</p>
						<p className="text-dark">{average}</p>
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
