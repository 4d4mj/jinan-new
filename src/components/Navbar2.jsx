import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Navbar2 = ({ faculty }) => {
	const router = useRouter();

	const handleLogout = () => {
		// Here, you can also add your logout logic like clearing tokens or session data.
		sessionStorage.removeItem("data");
		router.push("/login");
	};

	const pathname = usePathname();

	const navItems = [
		{ icon: "home", name: "home", route: "/" },
		{ icon: "add", name: "registration", route: "/registration" },
		{ icon: "attach_money", name: "payments", route: "/services" },
		{ icon: "history", name: "transcript", route: "/contact" },
		{ icon: "school", name: "curriculum", route: "/contact" },
		{ icon: "list", name: "petitions", route: "/contact" },
		{ icon: "laptop", name: "online classes", route: "/contact" },
		{ icon: "developer_guide", name: "manuals", route: "/contact" },
		{
			icon: "local_library",
			name: "al manhal",
			route: "https://platform.almanhal.com/",
		},
		{ icon: "help", name: "help", route: "/contact" },
		// Add more links as needed
	];

	return (
		<nav className="flex justify-between items-center text-white overflow-clip pt-2 px-5">
			<div className="flex gap-2 items-center text-dark basis-1/3 h-full">
				<Image
					src={`/images/${faculty}.svg`}
					width={52}
					height={52}
					alt="logo"
				/>
				<p className="flex flex-col font-semibold text-lg tracking-tighter">
					Jinan University
					<span className="text-xs capitalize tracking-normal">faculty of {faculty}</span>
				</p>
			</div>
			<div className={`flex bg-${faculty} p-2 gap-2 rounded-xl`}>
				{navItems.map((item) => (
					<Link
						href={item.route}
						key={item.name}
						className={`flex nav-item py-2 px-3 gap-1 capitalize rounded-md ${
							pathname === item.route
								? "bg-[rgba(255,255,255,0.2)]"
								: "opacity-75"
						}`}
					>
						<span className="material-symbols-outlined outlined small">
							{item.icon}
						</span>
						<span
							className={`flex nav-item font-medium text-sm ${
								pathname === item.route ? "block" : "hidden"
							}`}
						>
							{item.name}
						</span>
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

export default Navbar2;
