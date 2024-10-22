import { useState } from "react";

const CourseDetails = ({ course, closeModal }) => {
	const absences = 0;
	const grades = [70, 60, 90, 80];
	const lettergrades = ["C", "D", "A", "B+"];
	const dates = ["10/10/2021", "20/10/2021", "30/10/2021", "10/11/2021"];
	const [index1, setIndex1] = useState(0);
	const [index2, setIndex2] = useState(0);

	const increaseIndex1 = () => {
		setIndex1((prevIndex) =>
			prevIndex < course.folder.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const decreaseIndex1 = () => {
		setIndex1((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const increaseIndex2 = () => {
		setIndex2((prevIndex) =>
			prevIndex < course.homework.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const decreaseIndex2 = () => {
		setIndex2((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	return (
		<div className="col-span-4 row-span-3 p-4 bg-dark rounded-xl text-white grid grid-rows-2 grid-cols-2 relative gap-4">
			<button
				className="absolute right-0 top-0 icon z-10"
				onClick={closeModal}
			>
				<i className="material-symbols-outlined">close</i>
			</button>
			{/* details */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex flex-col justify-between p-4">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					details
				</h2>
				<div>
					<p className="text-xs font-medium opacity-50">
						{course.code} &bull; {course.type}
					</p>
					<h1 className="text-xl text-yellow font-medium">
						{course.name}
					</h1>
				</div>
				<div className="stack">
					<p>instructor</p>
					<p>{course.instructor}</p>
				</div>
				<div className="stack">
					<p>schedule</p>
					<p>{course.schedule}</p>
				</div>
				<div className="flex justify-between">
					<div className="stack">
						<p>credits</p>
						<p>{course.credits}</p>
					</div>
					<div className="stack">
						<p>grade</p>
						<p>{course.grade}</p>
					</div>
					<div className="stack">
						<p>room</p>
						<p>{course.room}</p>
					</div>
					<div className="stack">
						<p>section</p>
						<p>{course.section}</p>
					</div>
				</div>
			</div>
			{/* grades */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex p-4">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					grades
				</h2>
				{course.grades.length === 0 ? (
					<p className="flex justify-center items-center text-white opacity-50 flex-grow capitalize">
						grades not available yet
					</p>
				) : (
					<div className="flex-grow flex flex-col gap-2">
						<div className="capitalize flex justify-between items-center basis-1/4">
							<div className="font-medium">
								<p className="text-md">{course.grades[0].title} {course.grades[0].percentage}</p>
								<p className="text-xs opacity-50">
									{course.grades[0].date}
								</p>
							</div>
							<p className="text-lg font-semibold text-yellow">
								{course.grades[0].grade}
							</p>
						</div>
						<div className="capitalize flex justify-between items-center basis-1/4">
							<div className="font-medium">
							<p className="text-md">{course.grades[1].title} {course.grades[1].percentage}</p>
							<p className="text-xs opacity-50">
									Refer Your Instructor for details
								</p>
							</div>
							<p className="text-lg font-semibold text-yellow">
								{course.grades[1].grade}
							</p>
						</div>
						<div className="capitalize flex justify-between items-center basis-1/4">
							<div className="font-medium">
							<p className="text-md">{course.grades[2].title} {course.grades[2].percentage}</p>
							<p className="text-xs opacity-50">{course.grades[2].date}</p>
							</div>
							<p className="text-lg font-semibold text-yellow">
								{course.grades[2].grade}
							</p>
						</div>
						<div className="capitalize flex justify-between items-center basis-1/4">
							<div className="font-medium">
							<p className="text-md">{course.grades[3]?.title} {course.grades[3]?.percentage}</p>
							<p className="text-xs opacity-50">{course.grades[3]?.date}</p>
							</div>
							<p className="text-lg font-semibold text-yellow">
								{course.grades[3]?.grade}
							</p>
						</div>
						<div className="bg-light rounded-md px-4 py-2">
							<div className="capitalize flex justify-between items-center">
								<div className="font-medium">
									<p>final grade</p>
								</div>
								<p className="text-lg font-semibold text-yellow">
									{course.total} &bull; {course.letter}
								</p>
							</div>
						</div>
					</div>
				)}
			</div>
			{/* folder */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex p-4 gap-2">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					folder
				</h2>
				{course.folder.length === 0 ? (
					<p className="flex justify-center items-center text-lg text-white opacity-50 flex-grow">
						No Courses
					</p>
				) : (
					<div className="flex-grow flex flex-col justify-between">
						<div>
							<p className="text-lg font-medium text-yellow">
								{course.folder[index1].description}
							</p>
							<p className="capitalize opacity-50 text-sm font-medium">
								posted on {course.folder[index1].date}
							</p>
							<p>{course.folder[index1].file}</p>
						</div>
						<div className="flex gap-2">
							<button className="icon" onClick={decreaseIndex1}>
								<i className="material-symbols-outlined">
									arrow_back_ios_new
								</i>
							</button>
							<a
								href={`${course.folder[index1].downloadlink}`}
								className="flex flex-grow"
								target="_blank"
							>
								<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm flex-grow">
									download material
									<i className="material-symbols-outlined">
										download
									</i>
								</button>
							</a>
							<button className="icon" onClick={increaseIndex1}>
								<i className="material-symbols-outlined">
									arrow_forward_ios
								</i>
							</button>
						</div>
					</div>
				)}
			</div>
			{/* homework */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex p-4">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					homework
				</h2>
				{course.homework.length === 0 ? (
					<p className="flex justify-center items-center text-lg text-white opacity-50 flex-grow">
						No Homework
					</p>
				) : (
					<div className="flex-grow flex flex-col justify-between">
						<div>
							<p className="text-lg font-medium text-yellow">
								{course.homework[index2].title}
							</p>
							<p className="capitalize opacity-50 text-sm font-medium">
								posted on &bull; until{" "}
								{course.homework[index2].deadline}
							</p>
							<p>{course.homework[index2].description}</p>
						</div>
						<div className="flex gap-2">
							<button className="icon" onClick={decreaseIndex2}>
								<i className="material-symbols-outlined">
									arrow_back_ios_new
								</i>
							</button>
							<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm basis-1/2">
								subject
								<i className="material-symbols-outlined">
									download
								</i>
							</button>
							<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm basis-1/2">
								turn in
								<i className="material-symbols-outlined">
									upload
								</i>
							</button>
							<button className="icon" onClick={increaseIndex2}>
								<i className="material-symbols-outlined">
									arrow_forward_ios
								</i>
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseDetails;
