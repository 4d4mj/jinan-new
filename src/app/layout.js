import "material-symbols";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

// Metadata for the app
export const metadata = {
	title: "Jinan System",
	description: "Jinan University management system for students",
};

const readex_pro = Readex_Pro({
	subsets: ["arabic"],
	display: "swap",
	variable: "--font-readex",
	weight: ["200", "300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${readex_pro.className} antialiased`}>{children}</body>
		</html>
	);
}
