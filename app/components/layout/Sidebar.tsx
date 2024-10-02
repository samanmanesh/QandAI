"use client";
import ReturnIcon from "@/app/assets/ReturnIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const path = usePathname();
  console.log(path);

  return (
    <div className="h-full hidden md:flex flex-col md:w-1/4 p-4    ">
      <h1 className="text-4xl font-medium  ml-6 mt-2 ">Q&Ai</h1>
      <div className="w-fit mt-60 mx-auto ">
        {path.match("/qa") && (
          <Link href="/qa" className="flex gap-2 text-base font-semibold ">
            <ReturnIcon />
            <text className="max-w-20  font-bold">Return to generation page</text>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
