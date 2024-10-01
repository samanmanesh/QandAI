'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation'
import React from "react";

type Props = {};

//

const Sidebar = (props: Props) => {
  // if we are in /qa page, we wont see the Link to /qa page
  // because we are already in /qa page
  //write the code to show the link to /qa page

  const path = usePathname();
  console.log(path)



  return (
    <div className="h-full hidden md:flex flex-col md:w-1/4 p-4   ">
      <h1 className="text-4xl font-medium  ml-6 mt-2 ">Q&Ai</h1>
      <div className="w-fit mt-60 mx-auto ">
        {!path.match('/qa')  && (
          <Link href="/qa" className="flex gap-2 text-base font-semibold ">
            <div>icon</div>
            <text className="max-w-20">Return to generation page</text>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
