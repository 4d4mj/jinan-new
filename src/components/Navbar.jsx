"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Navbar.module.css";

const name = "Adam Jabado";

const links = [
	{ icon: "home", name: "home", route: "/" },
	{ icon: "add", name: "registration", route: "/about" },
	{ icon: "attach_money", name: "payments", route: "/services" },
	{ icon: "history", name: "transcript", route: "/contact" },
	{ icon: "school", name: "curriculum", route: "/contact" },
	{ icon: "list", name: "petitions", route: "/contact" },
	{ icon: "laptop", name: "online classes", route: "/contact" },
	{ icon: "developer_guide", name: "manuals", route: "/contact" },
	{ icon: "local_library", name: "al manhal", route: "https://platform.almanhal.com/" },
	{ icon: "help", name: "help", route: "/contact" },
	// Add more links as needed
];

const Navbar = () => {
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

	const router = useRouter();

	const pathname = usePathname();

	const handleLogout = () => {
		// Here, you can also add your logout logic like clearing tokens or session data.
		sessionStorage.removeItem("data");
		router.push("/login");
	};

	return (
		<nav className="h-14 w-screen bg-science flex justify-between items-center text-white overflow-clip">
			<div className="w-14"></div>
			<div className="flex gap-2 items-center">
				<Image
					src="/images/logo.svg"
					width={42}
					height={42}
					alt="logo"
				/>
				<span>Welcome, {name}!</span>
			</div>
			<button
				onClick={() => setIsSidePanelOpen(true)}
				className="h-full aspect-square bg-light flex justify-center items-center rounded-l-xl"
			>
				<i className="material-symbols-outlined flex">menu</i>
			</button>

			{/* Overlay */}
			<div
				onClick={() => setIsSidePanelOpen(false)}
				className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
					isSidePanelOpen
						? "opacity-50 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				}`}
			></div>

			{/* Side Panel */}
			<div
				className={`${
					styles.panel
				} fixed top-0 right-0 h-screen w-64 bg-dark z-50 transform rounded-l-xl p-4 flex flex-col justify-between ${
					isSidePanelOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Close Button */}
				<button
					onClick={() => setIsSidePanelOpen(false)}
					className="flex p-4 absolute top-0 right-0 text-white"
				>
					<i className="material-symbols-outlined">close</i>
				</button>
				<div className="capitalize text-yellow text-xl font-semibold flex gap-2">
					<div className="h-16 w-16">
						<Image
							src="/images/logo.svg"
							width={80}
							height={80}
							alt="logo"
						/>
					</div>
					jinan <br />
					university
				</div>
				{/* Links */}
				<ul className="flex flex-col gap-2">
					{links.map((link, index) => (
						<li key={index}>
							<Link
								href={link.route}
								className={`capitalize flex gap-2 justify-end p-2 rounded-lg font-semibold ${
									pathname === link.route
										? "bg-white text-dark"
										: "text-yellow"
								}`}
							>
								{link.name}
								<i className="material-symbols-outlined outlined">
									{link.icon}
								</i>
							</Link>
						</li>
					))}
				</ul>
				<button
					className="capitalize flex gap-2 justify-center p-2 rounded-lg font-medium bg-error shadow"
					onClick={handleLogout}
				>
					logout
					<i className="material-symbols-outlined">logout</i>
				</button>
			</div>
		</nav>
	);
};

export default Navbar;
