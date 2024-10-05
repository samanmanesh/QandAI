import { clsx } from "clsx";
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
      className={clsx(
        `bg-neutral-900 hover:bg-[#282232] rounded-full  py-2 px-6 flex gap-2 text-white font-semibold justify-center max-w-64 min-w-14 hover:shadow-md transition-transform duration-300 ease-in-out`,
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
