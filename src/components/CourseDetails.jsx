import { useState } from "react";

const CourseDetails = ({ course, closeModal }) => {
	const instructor = "Dr. John Doe";
	const room = "412";
	const section = "A";
	const schedule = ["Wed 8:05 - 10:00", "Sat 9:05 - 10:00"];
	const absences = 0;
	const grades = [70, 60, 90, 80];
	const lettergrades = ["C", "D", "A", "B+"];
	const dates = ["10/10/2021", "20/10/2021", "30/10/2021", "10/11/2021"];
	const [index1, setIndex1] = useState(0);
	const [index2, setIndex2] = useState(0);

	const increaseIndex1 = () => {
		setIndex1((prevIndex) =>
			prevIndex < lectures.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const decreaseIndex1 = () => {
		setIndex1((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const increaseIndex2 = () => {
		setIndex2((prevIndex) =>
			prevIndex < homeworks.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	const decreaseIndex2 = () => {
		setIndex2((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const lectures = [
		{
			title: "Lecture 1",
			date: "08/10/2021",
			description: "Introduction to the course.",
		},
		{
			title: "Lecture 2",
			date: "15/10/2021",
			description: "Discussing the first chapter.",
		},
		{
			title: "Lecture 3",
			date: "22/10/2021",
			description: "Presenting the first assignment.",
		},
	];

	const homeworks = [
		{
			title: "Homework 1",
			date: "08/10/2021",
			deadline: "15/10/2021",
			description: "Complete the exercises on page 42.",
		},
		{
			title: "Homework 2",
			date: "15/10/2021",
			deadline: "22/10/2021",
			description: "Write an essay on the topic discussed in class.",
		},
		{
			title: "Homework 3",
			date: "22/10/2021",
			deadline: "29/10/2021",
			description: "Prepare a presentation on your chosen subject.",
		},
		{
			title: "Homework 4",
			date: "29/10/2021",
			deadline: "05/11/2021",
			description: "Solve the problems in the assignment sheet.",
		},
	];

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
					<p className="text-xs font-medium opacity-75">
						{course.code} &bull; {course.type}
					</p>
					<h1 className="text-xl text-yellow font-medium">
						{course.name}
					</h1>
				</div>
				<div className="stack">
					<p>instructor</p>
					<p>{instructor}</p>
				</div>
				<div className="stack">
					<p>schedule</p>
					<p>
						{schedule[0]} &bull; {schedule[1]}
					</p>
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
						<p>{room}</p>
					</div>
					<div className="stack">
						<p>section</p>
						<p>{section}</p>
					</div>
				</div>
			</div>
			{/* grades */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex flex-col justify-between p-4">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					grades
				</h2>
				<div className="capitalize flex justify-between items-center">
					<div className="font-medium">
						<p className="text-md">attendance (10%)</p>
						<p className="text-xs opacity-50">
							{absences} absences
						</p>
					</div>
					<p className="text-lg font-semibold text-yellow">
						{grades[0]}
					</p>
				</div>
				<div className="capitalize flex justify-between items-center">
					<div className="font-medium">
						<p className="text-md">classwork (20%)</p>
						<p className="text-xs opacity-50">
							Refer Your Instructor for details
						</p>
					</div>
					<p className="text-lg font-semibold text-yellow">
						{grades[1]}
					</p>
				</div>
				<div className="capitalize flex justify-between items-center">
					<div className="font-medium">
						<p className="text-md">midterm exam (30%)</p>
						<p className="text-xs opacity-50">{dates[0]}</p>
					</div>
					<p className="text-lg font-semibold text-yellow">
						{grades[2]}
					</p>
				</div>
				<div className="capitalize flex justify-between items-center">
					<div className="font-medium">
						<p className="text-md">final exam (40%)</p>
						<p className="text-xs opacity-50">{dates[1]}</p>
					</div>
					<p className="text-lg font-semibold text-yellow">
						{grades[3]}
					</p>
				</div>
				<div className="bg-light rounded-md px-4 py-2">
					<div className="capitalize flex justify-between items-center">
						<div className="font-medium">
							<p>final grade</p>
						</div>
						<p className="text-lg font-semibold text-yellow">
							{grades[3]} &bull; {lettergrades[3]}
						</p>
					</div>
				</div>
			</div>
			{/* folder */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex flex-col justify-between p-4 gap-2">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					folder
				</h2>
				<div>
					<p className="text-lg font-medium text-yellow">
						{lectures[index1].title}
					</p>
					<p className="capitalize opacity-50 text-sm font-semibold">
						posted on {lectures[index1].date}
					</p>
					<p>{lectures[index1].description}</p>
				</div>
				<div className="flex gap-2">
					<button className="icon" onClick={decreaseIndex1}>
						<i className="material-symbols-outlined">
							arrow_back_ios_new
						</i>
					</button>
					<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm flex-grow">
						download material
						<i className="material-symbols-outlined">download</i>
					</button>
					<button className="icon" onClick={increaseIndex1}>
						<i className="material-symbols-outlined">
							arrow_forward_ios
						</i>
					</button>
				</div>
			</div>
			{/* homework */}
			<div className="border-2 border-opacity-50 border-white h-full rounded-lg relative flex flex-col justify-between p-4">
				<h2 className="capitalize text-[rgba(255,255,255,0.6)] bg-dark px-2 absolute -top-3 font-medium">
					homework
				</h2>
				<div>
					<p className="text-lg font-medium text-yellow">
						{homeworks[index2].title}
					</p>
					<p className="capitalize opacity-50 text-sm font-semibold">
						posted on {homeworks[index2].date} &bull; until{" "}
						{homeworks[index2].deadline}
					</p>
					<p>{homeworks[index2].description}</p>
				</div>
				<div className="flex gap-2">
					<button className="icon" onClick={decreaseIndex2}>
						<i className="material-symbols-outlined">
							arrow_back_ios_new
						</i>
					</button>
					<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm basis-1/2">
						subject
						<i className="material-symbols-outlined">download</i>
					</button>
					<button className="flex justify-center items-center gap-2 capitalize icon font-medium text-sm basis-1/2">
						turn in
						<i className="material-symbols-outlined">upload</i>
					</button>
					<button className="icon" onClick={increaseIndex2}>
						<i className="material-symbols-outlined">
							arrow_forward_ios
						</i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseDetails;
