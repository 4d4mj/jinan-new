import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const Navbar = ({ faculty }) => {
	const router = useRouter();
	const pathname = usePathname();
	const [hovered, setHovered] = useState(null); // Track hovered item for tooltip
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		// Trigger the animation when the component mounts
		setAnimate(true);
	}, []);

	const handleLogout = () => {
		// Add logout logic
		sessionStorage.removeItem("data");
		router.push("/login");
	};

	const navItems = [
		{ icon: "home", name: "home", route: "/" },
		{ icon: "add", name: "registration", route: "/registration" },
		{ icon: "attach_money", name: "payments", route: "/payments" },
		{ icon: "history", name: "transcript", route: "/transcript" },
		{ icon: "school", name: "curriculum", route: "/curriculum" },
		{ icon: "list", name: "petitions", route: "/petitions" },
		{
			icon: "laptop",
			name: "online classes",
			route: "https://jinansystem.com/student/onlineClasses.php",
		},
		{ icon: "developer_guide", name: "manuals", route: "/manuals" },
		{
			icon: "local_library",
			name: "al manhal",
			route: "https://platform.almanhal.com/",
		},
		{ icon: "help", name: "help", route: "/help" },
	];

	return (
		<nav className="flex justify-between items-center text-white pt-2 pb-4 px-5 sticky top-0 bg-white z-50">
			<div className="flex gap-2 items-center text-dark basis-1/3 h-full">
				<Image
					src={`/images/${faculty}.svg`}
					width={52}
					height={52}
					alt="logo"
				/>
				<p className="flex flex-col font-semibold text-lg tracking-tighter">
					Jinan University
					<span className="text-xs capitalize tracking-normal">
						faculty of {faculty}
					</span>
				</p>
			</div>
			<div
				className={`relative justify-between w-[45rem] flex bg-${faculty} p-2 rounded-xl`}
			>
				{navItems.map((item) => (
					<Link href={item.route} key={item.name}>
						<div
							className={`relative group flex nav-item py-2 px-3 justify-center gap-1 capitalize rounded-md `}
							onMouseEnter={() => setHovered(item.name)}
							onMouseLeave={() => setHovered(null)}
						>
							<span
								className={`material-symbols-outlined outlined small
								${pathname === item.route ? "" : "opacity-75"}
								`}
							>
								{item.icon}
							</span>
							{/* Tooltip */}
							<span
								className={`absolute -bottom-10 bg-[rgba(50,50,50,0.5)] shadow-md text-white text-xs rounded-md px-2 py-1 whitespace-nowrap backdrop-blur-lg opacity transition-all duration-300
									${
										pathname != item.route &&
										hovered === item.name
											? "opacity-100"
											: "translate-y-1 opacity-0"
									}
									`}
							>
								{item.name}
							</span>
							{/* Link Text */}
							<span
								className={`flex nav-item font-medium text-sm transform origin-left transition-all ease-[cubic-bezier(0.87,0,0.1,1)] duration-500 ${
									pathname === item.route && animate
										? "translate-x-0 opacity-100"
										: "-translate-x-2 opacity-0 absolute pointer-events-none"
								}`}
							>
								{item.name}
							</span>
							{/* Animated Highlight */}
							{pathname === item.route && (
								<div
									className={`absolute top-0 inset-0 bg-white rounded-md transform origin-bottom transition-opacity duration-500 ${
										animate ? "opacity-20" : "opacity-0"
									}`}
								></div>
							)}
						</div>
					</Link>
				))}
			</div>
			<div className="basis-1/3 flex justify-end">
				<button
					className="capitalize flex gap-2 justify-center py-3 px-4 rounded-lg font-medium bg-error text-sm"
					onClick={handleLogout}
				>
					logout
					<i className="material-symbols-outlined small">logout</i>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
