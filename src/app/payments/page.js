"use client";
import Navbar from "@/components/Navbar";
import Profile from "@components/Profile";
import Payment from "@/components/Payment";
import PaymentDetails from "@/components/PaymentDetails";
import PaymentCourses from "@/components/PaymentCourses";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@components/Loading";

export default function RegistrationPage() {
	const router = useRouter();
	const [data, setStoredData] = useState(null);
	const [selectedSemester, setSelectedSemester] = useState("");
	const [animate, setAnimate] = useState(false);
	const [loading, setLoading] = useState(true); // For initial loading delay

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
					setLoading(false); // Disable loading once data is set
				} catch (error) {
					console.error("Failed to parse session data:", error);
					router.push("/login");
				}
			}
		}
	}, [router]);

	useEffect(() => {
		// Trigger animation on initial load and when semester changes
		setAnimate(false);
		setTimeout(() => setAnimate(true), 100);
	}, [selectedSemester]);

	// Filter courses based on selected semester
	const coursesForSelectedSemester = data?.courses.find(
		(course) => course.semester === selectedSemester
	);

	const paymentsForSelectedSemester = data?.payments.find(
		(payment) => payment.semester === selectedSemester
	);

	if (loading || !data || !coursesForSelectedSemester || !paymentsForSelectedSemester) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar faculty={data.profile.faculty} />
			<div className="flex-grow flex p-5 pt-1 gap-6">
				<Profile
					profile={data.profile}
					selectedSemester={selectedSemester}
					setSelectedSemester={setSelectedSemester}
					totalCredits={coursesForSelectedSemester.totalCreditsAttempted}
					totalPassed={coursesForSelectedSemester.totalCreditsPassed}
					average={coursesForSelectedSemester.averageGrade}
					schedule={coursesForSelectedSemester.scheduleLink}
				/>
				<div
					className={`flex flex-grow flex-col gap-8  ${
						animate ? "transform transition-all duration-300 ease translate-y-0 opacity-100" : "translate-y-3 opacity-0"
					}`}
				>
					<div className="grid grid-cols-3 gap-4 mb-4 relative">
						{paymentsForSelectedSemester?.payments.map((payment, index) => (
							<Payment
								key={index}
								bank_no={payment.bank_no}
								amount={payment.amount}
								date={payment.date}
								due={payment.due}
								status={payment.status}
								link={payment.link}
							/>
						))}
						<div className="absolute -bottom-6 text-error text-sm font-medium">
							NOTE: If your paid voucher is not set as PAID by the next
							day you paid it, please refer to the bank.
						</div>
					</div>
					<PaymentCourses
						title={selectedSemester}
						courses={paymentsForSelectedSemester.courses}
					/>
					<PaymentDetails
						title="account details"
						details={paymentsForSelectedSemester.details.account}
					/>
					<PaymentDetails
						title="manual"
						details={paymentsForSelectedSemester.details.manual}
					/>
				</div>
			</div>
		</div>
	);
}
