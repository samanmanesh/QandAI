import ArrowDownIcon from "@/app/assets/ArrowDownIcon";
import React from "react";

type ButtonProps = {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | "generate";
  children: React.ReactNode;
};

const Button = ({ onClick, type, children }: ButtonProps) => {
  return (
    <button
      className="bg-[#1B1623] rounded-full p-3 flex gap-2 text-white font-semibold justify-center max-w-64 min-w-14 hover:shadow-md transition-transform duration-200 ease-in-out"
      onClick={onClick}
    >
      {type === "generate" && <ArrowDownIcon />}
      {children}
    </button>
  );
};

export default Button;
