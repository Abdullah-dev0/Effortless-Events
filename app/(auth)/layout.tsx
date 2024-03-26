import { Footer } from "@/components/shared/Footer";
import Header from "@/components/shared/Header";

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
         {children}
      </div>
   );
}
