import "material-symbols";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata = {
	title: "Jinan System",
	description: "Jinan University management system for students",
	// icons: {
	// 	icon: [
	// 		{
	// 			media: "(prefers-color-scheme: light)",
	// 			url: "/favico/42light.ico",
	// 			href: "/favico/42light.ico",
	// 		},
	// 		{
	// 			media: "(prefers-color-scheme: dark)",
	// 			url: "/favico/42dark.ico",
	// 			href: "/favico/42dark.ico",
	// 		},
	// 	],
	// },
};

const poppins = Poppins({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-poppins",
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
