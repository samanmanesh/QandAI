"use client";
import ReturnIcon from "@/app/assets/ReturnIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import QAIcon from "@/app/assets/QAIIcon";

const Sidebar = () => {
  //we want ot find if we are on the [id] page
  const pathname = usePathname();

  // Check if the current path matches /qa/something (but not just /qa)
  const showSidebar = pathname && pathname.match(/^\/qa\/[^/]+$/);

  const [clicked, setClicked] = useState<boolean>(false);
  const handleOnClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false);
    }, 50);
  };

  return (
    <div className="h-full hidden md:flex flex-col md:w-1/4 p-4    ">
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
        <Link href="/qa">
          <QAIcon className="ml-6 mt-4 w-12" />
        </Link>
        {showSidebar && (
          <motion.div
            className="w-fit mt-60 mx-auto group "
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
              className={`flex gap-2 text-base font-medium group-hover:opacity-60  transition-all duration-100 ease-in-out
                ${clicked ? "scale-95" : "scale-100"} 
                `}
              onClick={handleOnClick}
            >
              <ReturnIcon  className="group-hover:-translate-x-2"/>
              <text className="max-w-20  font-medium">
                Return to generation page
              </text>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Sidebar;
