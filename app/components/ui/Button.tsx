import { cn } from "@/app/utils/cn";
import React from "react";

type ButtonProps = {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | "generate";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
};

const Button = ({ onClick, type, children, className, icon }: ButtonProps) => {
  return (
    <button
      className={cn(
        `bg-neutral-900  rounded-full py-2 px-6 flex gap-2 text-white font-medium  justify-center max-w-36 md:max-w-64 min-w-14 hover:shadow-md transition-transform duration-300 ease-in-out`,
        className
      )}
      onClick={onClick}
    >
      {type === "generate" && icon && icon}
      {children}
    </button>
  );
};

export default Button;
