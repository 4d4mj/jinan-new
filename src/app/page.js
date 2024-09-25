"use client";
import Navbar from "@components/Navbar";
import Profile from "@components/Profile";
import Course from "@components/Course";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";

export default function Home() {
	const router = useRouter();
	const [data, setStoredData] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState(""); // Track the selected semester

	useEffect(() => {
		if (typeof window !== "undefined") {
			const data = sessionStorage.getItem("data");

			// If no data, redirect to login page
			if (!data) {
				router.push("/login");
			} else {
				try {
					// Try to parse the stored data
					const parsedData = JSON.parse(data);
					setStoredData(parsedData);
					setSelectedSemester(parsedData.courses[0]?.semester); // Set default semester
				} catch (error) {
					console.error("Failed to parse session data:", error);
					router.push("/login");
				}
			}
		}
	}, [router]);

	// Filter courses based on selected semester
	const coursesForSelectedSemester = data?.courses.find(
		(course) => course.semester === selectedSemester
	);

	// Log only if data and coursesForSelectedSemester are available
	if (coursesForSelectedSemester) {
		console.log("total ", coursesForSelectedSemester?.totalCreditsAttempted);
	}

	if (!data || !coursesForSelectedSemester) {
		// Avoid rendering the component or logging when data isn't fully loaded yet
		return <Loading />;
	}

	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="flex-grow flex p-5 gap-6">
				{/* Pass selectedSemester and setSelectedSemester to Profile */}
				<Profile
					profile={data.profile}
					selectedSemester={selectedSemester}
					setSelectedSemester={setSelectedSemester}
					totalCredits={coursesForSelectedSemester.totalCreditsAttempted}
					totalPassed={coursesForSelectedSemester.totalCreditsPassed}
					average={coursesForSelectedSemester.averageGrade}
				/>

				{/* Display courses for the selected semester */}
				<div className="flex-grow grid grid-cols-4 gap-4 grid-rows-3">
					{coursesForSelectedSemester?.courses.map((course, index) => (
						<Course key={index} course={course} />
					))}
				</div>
			</div>
		</div>
	);
}
