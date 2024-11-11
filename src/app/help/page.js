"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";
import Profile from "@/components/Profile";
import Manual from "@/components/Manual";

export default function RegistrationPage() {
	const router = useRouter();
	const [data, setStoredData] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState("");
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

	const options = [
		"administration",
		"admissions",
		"financial department",
		"it department",
		"deans assistant",
		"student affairs",
	];

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
				<div
					className={`flex-grow flex flex-col gap-4 transform transition-all duration-300 ease
					 ${animate ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
					`}
				>
					{/*  */}
					<div className="text-error">
						Please read this note carefully before you submit your
						support request
					</div>
					<div className="text-sm capitalize">
						<p>
							YOU CAN CHECK OUR REPLIES FROM THE VIEW REPLIES
							SECTION BELOW. REPLIES ARE NOT SENT BY SMS OR EMAIL.
						</p>
						<p>
							You must choose the relevant category as listed
							below, otherwise your request will not be processed
							and could be removed from the system.
						</p>
					</div>
					<div className="flex flex-col gap-1 text-xs p-4 bg-darkt rounded-lg">
						<p>
							<span className="font-semibold text-dark">
								Administration Category:
							</span>{" "}
							Issues directed to VP (complaints, suggestions,
							etc...)
						</p>
						<p>
							<span className="font-semibold text-dark">
								Admissions Category:
							</span>{" "}
							Issues related to your application (master file
							information)
						</p>
						<p>
							<span className="font-semibold text-dark">
								Financial Department Category:
							</span>{" "}
							Issues related to Tuition fees (payment vouchers,
							penalties, financial aid, financial block, etc...)
						</p>
						<p>
							<span className="font-semibold text-dark">
								IT Department Category:
							</span>{" "}
							Pure technical issues.
						</p>
						<p>
							<span className="font-semibold text-dark">
								Deans Assistant Category:
							</span>{" "}
							Issues related to Academics (grades, registration,
							major, offerings, etc...)
						</p>
						<p>
							<span className="font-semibold text-dark">
								Student Affairs Category:
							</span>{" "}
							Issues related to your absences, academic block,
							general inquiries & guidance, non-academic matters,
							etc...)
						</p>
					</div>
					<div className="flex gap-2">
						<input
							type="text"
							placeholder="Subject"
							className="border-2 border-dark rounded-lg px-4 flex-grow"
						/>
						{/* select */}
						<div className="flex relative">
							<select className="text-white appearance-none min-w-80 bg-light px-4 py-2 rounded-lg shadow outline-none border-none relative font-medium">
								{options.map((option, index) => (
									<option
										key={index}
										value={option}
										className="text-[rgba(255,255,255,0.5)] bg-dark"
									>
										{option}
									</option>
								))}
							</select>
							<i className="material-symbols-outlined pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white z-10">
								keyboard_arrow_down
							</i>
						</div>
						<button className="bg-light px-6 rounded-lg text-white flex justify-center items-center gap-2 capitalize font-medium text-sm">
							send
							<i className="material-symbols-outlined outlined">
								send
							</i>
						</button>
					</div>
					<textarea
						placeholder="Message"
						className="border-2 border-dark rounded-lg px-4 py-2 resize-none flex-grow"
					></textarea>
				</div>
			</div>
		</div>
	);
}
