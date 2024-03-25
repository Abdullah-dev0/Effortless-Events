"use client";

import { useEffect, useState } from "react";
export default function Home() {
   const [state, setState] = useState(0);

   useEffect(() => {
      const sum = () => {
         let a = 10;
         let b = 20;
         let c = a + b;
         setState(c);
      };

      sum();
   }, [state]);
   return (
      <>
         <h1 className="text-4xl grid h-screen place-content-center bg-pink-700">
            {state}
         </h1>
      </>
   );
}
