import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({
   subsets: ["latin"],
   weight: ["400", "700"],
   variable: "--fontpopnsvariable: '--font-poppins'",
});

export const metadata: Metadata = {
   title: "Effortless Events",
   description:
      "Effortless Events is a full-service event planning Website that specializes in creating unique and memorable events for our clients.",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ClerkProvider>
         <html lang="en">
            <body className={poppins.className}>{children}</body>
         </html>
      </ClerkProvider>
   );
}
