"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Profile from "@/components/Profile";
import Semester from "@/components/Semester";
import Transcript from "@/components/Curriculum";

export default function CurriculumPage() {
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
		console.log(
			"total ",
			coursesForSelectedSemester?.totalCreditsAttempted
		);
	}

	if (!data || !coursesForSelectedSemester) {
		// Avoid rendering the component or logging when data isn't fully loaded yet
		return <Loading />;
	}

	return (
		<div className="flex flex-col h-screen">
			<Navbar faculty={data.profile.faculty} />
			<div className="flex-grow flex p-5 pt-1 gap-6">
				{/* Display courses for the selected semester */}
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
				{/* transcript */}
				<div className="flex-grow flex flex-col gap-4">
					<Transcript />
					<Transcript />

					{/* totals */}
					<div>
						<table className="w-full">
							{/* header */}
							<thead className="bg-light text-white">
								<tr className="capitalize text-lg text-yellow">
									<th
										colSpan="4"
										className="pt-2 font-medium rounded-t-xl"
									></th>
								</tr>
								<tr className="text-yellow text-sm text-left relative capitalize">
									<th className="px-2 pb-2 font-medium w-1/4">
										transfer courses
									</th>
									<th className="px-2 pb-2 font-medium w-1/4">
										total credits
									</th>
									<th className="px-2 pb-2 font-medium w-1/4">
										major average
									</th>
									<th className="px-2 pb-2 font-medium w-1/4">
										average
									</th>
								</tr>
							</thead>
							<tbody className="font-medium text-dark bg-light text-lg">
								<tr className="capitalize text-yellow">
									<td className="px-2 pb-2 font-medium rounded-bl-lg">
										9
									</td>
									<td className="px-2 pb-2">9</td>
									<td className="px-2 pb-2">9</td>
									<td className="px-2 pb-2 rounded-br-lg">
										10
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}