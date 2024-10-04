"use client";
import ReturnIcon from "@/app/assets/ReturnIcon";
import { tr } from "framer-motion/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  //we want ot find if we are on the [id] page
  const pathname = usePathname();

  // Check if the current path matches /qa/something (but not just /qa)
  const showSidebar = pathname && pathname.match(/^\/qa\/[^/]+$/);

  // console.log(path);
  const [clicked, setClicked] = useState<boolean>(false);
  const handleOnClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 50);
  };

  return (
    <div className="h-full hidden md:flex flex-col md:w-1/4 p-4    ">
      <h1 className="text-4xl font-medium  ml-6 mt-2 ">Q&Ai</h1>
      <div className="w-fit mt-60 mx-auto ">
        {showSidebar && (
          <Link
            href="/qa"
            className={`flex gap-2 text-base font-medium hover:opacity-75 transform transition-all 
                ${clicked ? "scale-95" : "scale-100"} 
              `}
            onClick={handleOnClick}
          >
            <ReturnIcon />
            <text className="max-w-20  font-bold">
              Return to generation page
            </text>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
