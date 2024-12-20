"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Profile from "@/components/Profile";
import Semester from "@/components/Semester";
import Transcript from "@/components/Transcript";
import Transferred from "@/components/Transferred";

export default function TranscriptPage() {
	const router = useRouter();
	const [data, setStoredData] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState(""); // Track the selected semester
	const [animate, setAnimate] = useState(false);

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

	useEffect(() => {
		setTimeout(() => setAnimate(true), 100);
	}, []);

	// Filter courses based on selected semester
	const coursesForSelectedSemester = data?.courses.find(
		(course) => course.semester === selectedSemester
	);

	if (!data || !coursesForSelectedSemester) {
		// Avoid rendering the component or logging when data isn't fully loaded yet
		return <Loading />;
	}

	return (
		<div className="flex flex-col min-h-screen">
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
				<div className={`flex-grow flex flex-col gap-4 transform transition-all duration-300 ease
					 ${animate ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
					`}>
					<Transferred
						transferred={data.transcript.transferred}
						totaltransfer={data.transcript.totaltransfer}
					/>
					{/* <Transcript /> */}
					{data.transcript.semesters.map((semester) => (
						<Transcript semester={semester} key={semester.title} />
					))}

					{/* totals */}
					<div>
						<div className="flex justify-between p-4 bg-darkt rounded-xl px-6">
							<div className="stack">
								<p>transferred credits</p>
								<p>{data.transcript.totaltransfer}</p>
							</div>
							<div className="stack">
								<p>total credits</p>
								<p>{data.transcript.totalCredits}</p>
							</div>
							<div className="stack">
								<p>major average</p>
								<p>{data.transcript.majorAverage}</p>
							</div>
							<div className="stack">
								<p>average</p>
								<p>{data.transcript.average}</p>
							</div>
						</div>
						<div className="flex justify-end mt-1">
							<a href="https://jinansystem.com/student/MyTranscript/transcriptPF.php" target="blank" className="text-xs font-medium text-dark underline capitalize">
								printer friendly
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
