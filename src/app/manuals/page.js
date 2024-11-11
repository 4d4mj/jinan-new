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

	const links = [
		{
			title: "UMS Student Guide",
			arabic: "دليل الطالب",
			description: "A comprehensive guide to the UMS system",
			link: "https://jinansystem.com/student/MyManual/UMSStdMan.pdf",
		},
		{
			title: "Student Discipline System",
			arabic: "نظام الانضباط الطلابي",
			description: "Rules and regulations for student discipline",
			link: "https://jinansystem.com/student/MyManual/studentrules.jpeg",
		},
		{
			title: "Student Registration Guide",
			arabic: "دليل الطالب لمرحلة التسجيل",
			description: "A guide to the registration process",
			link: "https://jinansystem.com/student/MyManual/StudentGuidePart1.pdf",
		},
		{
			title: "Student Start-Up Guide",
			arabic: "دليل الطالب لمرحلة بدء الدراسة",
			description: "A guide to starting your studies",
			link: "https://jinansystem.com/student/MyManual/StudentGuidePart2.pdf",
		},
		{
			title: "Student Financial Guide",
			arabic: "دليل الطالب المالي",
			description: "A guide to financial matters for students",
			link: "https://youtu.be/I9IrNYPENLA",
		},
		{
			title: "Student Email Activation Guide",
			arabic: "تفعيل البريد الالكتروني الجامعي",
			description: "A guide to activating your university email",
			link: "https://youtu.be/ibEcq4m1TxE",
		},
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
				<div className={`flex-grow grid grid-cols-3 gap-4 grid-rows-3 transform transition-all duration-300 ease
					 ${animate ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
					`}>
					{links.map((link, index) => (
						<Manual
							key={index}
							title={link.title}
							arabic={link.arabic}
							description={link.description}
							link={link.link}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
