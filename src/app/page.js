"use client";
import Navbar from "@/components/Navbar";
import Profile from "@components/Profile";
import Course from "@components/Course";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import CourseDetails from "@/components/CourseDetails";

export default function Home() {
	const router = useRouter();
	const [data, setStoredData] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState("");
	const [animate, setAnimate] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState(null);

	useEffect(() => {
		// Trigger animation on initial load
		setTimeout(() => setAnimate(true), 100);
	}, []);

	useEffect(() => {
		// Trigger animation on selectedSemester change
		setAnimate(false);
		setTimeout(() => setAnimate(true), 100);
	}, [selectedSemester]);

	const handleInfoClick = (course) => {
		setSelectedCourse(course);
	};

	const closeModal = () => {
		setSelectedCourse(null);
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const data = sessionStorage.getItem("data");

			if (!data) {
				router.push("/login");
			} else {
				try {
					const parsedData = JSON.parse(data);
					setStoredData(parsedData);
					setSelectedSemester(parsedData.courses[0]?.semester);
				} catch (error) {
					console.error("Failed to parse session data:", error);
					router.push("/login");
				}
			}
		}
	}, [router]);

	const coursesForSelectedSemester = data?.courses.find(
		(course) => course.semester === selectedSemester
	);

	if (!data || !coursesForSelectedSemester) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col h-screen">
			<Navbar faculty={data.profile.faculty} />
			<div className="flex-grow flex p-5 pt-1 gap-6">
				<Profile
					profile={data.profile}
					selectedSemester={selectedSemester}
					setSelectedSemester={setSelectedSemester}
					totalCredits={
						coursesForSelectedSemester.totalCreditsAttempted
					}
					totalPassed={coursesForSelectedSemester.totalCreditsPassed}
					average={coursesForSelectedSemester.averageGrade}
					schedule={coursesForSelectedSemester.scheduleLink}
				/>

				{/* Conditionally render the grid or the selected course info */}
				<div
					className={`flex-grow grid grid-cols-4 gap-4 grid-rows-3 overflow-y-auto ${
						animate ? " transform transition-all duration-300 ease translate-y-0 opacity-100" : "translate-y-3 opacity-0"
					}`}
				>
					{selectedCourse ? (
						<CourseDetails course={selectedCourse} closeModal={closeModal} />
					) : (
						coursesForSelectedSemester?.courses.map((course, index) => (
							<Course
								key={index}
								course={course}
								onInfoClick={() => handleInfoClick(course)}
							/>
						))
					)}
				</div>
			</div>
		</div>
	);
}
