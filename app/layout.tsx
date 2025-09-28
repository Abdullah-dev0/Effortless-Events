import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "700"],
	variable: "--fontpopnsvariable: '--font-poppins'",
});

export const metadata: Metadata = {
	title: "Effortless Events",
	description:
		"A comprehensive, full-stack platform for managing events. Discover diverse events taking place globally, purchase tickets, or create and manage your own events with seamless payment processing.",
	openGraph: {
		title: "Effortless Events",
		description:
			"A comprehensive, full-stack platform for managing events. Discover diverse events taking place globally, purchase tickets, or create and manage your own events with seamless payment processing.",
		url: "https://effortless-events.vercel.app",
		siteName: "Effortless Events",
		images: [
			{
				url: "https://effortless-events.vercel.app/og-image.png",
				width: 1200,
				height: 630,
				alt: "Effortless Events - Full Stack Events Platform",
			},
		],
		locale: "en_US",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Effortless Events",
		description:
			"A comprehensive, full-stack platform for managing events. Discover diverse events taking place globally, purchase tickets, or create and manage your own events with seamless payment processing.",
		images: ["https://effortless-events.vercel.app/og-image.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={poppins.className}>
					{children}
					<Analytics />
				</body>
			</html>
		</ClerkProvider>
	);
}
