import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";
// import NavItems from "./NavItems";
// import MobileNav from "./MobileNav";

const Header = () => {
   return (
      <header className="w-full border-b">
         <div className="wrapper flex items-center justify-between">
            <Link href="/" className="w-36">
               <Image
                  src="/assets/images/logo.svg"
                  width={128}
                  height={38}
                  alt="Evently logo"
               />
            </Link>

            <div>
               <nav className="md:flex-between hidden">
                  <NavItems />
               </nav>
            </div>

            <div className="flex w-32 justify-end items-center gap-3">
               <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                  <MobileNav />
               </SignedIn>
               <SignedOut>
                  <Button asChild className="rounded-full" size="lg">
                     <Link href="/sign-in">Login</Link>
                  </Button>
               </SignedOut>
            </div>
         </div>
      </header>
   );
};

export default Header;
