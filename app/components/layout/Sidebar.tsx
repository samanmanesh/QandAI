"use client";
import ReturnIcon from "@/app/assets/ReturnIcon";
import { tr } from "framer-motion/client";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
      {showSidebar && (
        <motion.div
          className="h-full flex flex-col"
          initial={{ opacity: 0, x: -50, filter: "blur(6px)" }}
          animate={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            transition: {
              delay: 0.1,
              duration: 0.2,
              ease: "easeInOut",
            },
          }}
        >
          <Link
            href="/qa"
            // className={` hover:scale-105 transform transition-all
            //     ${clicked ? "scale-95" : "scale-100"}
            //   `}
            // onClick={handleOnClick}
          >
            <h1 className="text-3xl font-medium tracking-tight ml-6 mt-2 hover:drop-shadow-xl ">
              Q&Ai
            </h1>
          </Link>
          <div className="w-fit mt-60 mx-auto ">
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
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Sidebar;
