"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import Image from "next/image";
import styles from "@styles/Navbar.module.css";

const name = "Adam Jabado";

const links = [
	{ icon: "home", name: "home", route: "/" },
	{ icon: "add", name: "about", route: "/about" },
	{ icon: "home", name: "services", route: "/services" },
	{ icon: "home", name: "contact", route: "/contact" },
	// Add more links as needed
];

const Navbar = () => {
	const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

	const router = useRouter();

	const handleLogout = () => {
		// Here, you can also add your logout logic like clearing tokens or session data.

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

				{/* Links */}
				<ul className="flex flex-col gap-2 mt-12">
					{links.map((link, index) => (
						<li key={index}>
							<Link
								href={link.route}
								className={`capitalize flex gap-2 justify-end p-2 rounded-lg font-medium ${
									router.pathname === link.route ? "bg-white text-dark" : "bg-light"
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
					className="capitalize flex gap-2 justify-center p-2 rounded-lg font-medium bg-error"
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
