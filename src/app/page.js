import Navbar from "@components/Navbar";
import Profile from "@components/Profile";
import Course from "@components/Course";

export default function Home() {
	return (
		<div className="flex flex-col h-screen">
			<Navbar />
			<div className="flex-grow flex p-5 gap-6">
				<Profile />
				<div className="flex-grow grid grid-cols-4 gap-4 grid-rows-3">
					<Course />
					<Course />
				</div>
			</div>
		</div>
	);
}
