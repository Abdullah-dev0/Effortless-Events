import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
   title: "Effortless Events",
   description: "Effortless Events is a full-service event planning Website that specializes in creating unique and memorable events for our clients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <SideBar /> */}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
