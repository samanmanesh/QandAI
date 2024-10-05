import { clsx } from "clsx";
import React from "react";

type ButtonProps = {
  onClick: () => void;
  type?: "button" | "submit" | "reset" | "generate";
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  notification?: string;
};

const Button = ({
  onClick,
  type,
  children,
  className,
  icon,
  notification,
}: ButtonProps) => {
  return (
    <div
      className={clsx(
        ` bg-neutral-900 hover:bg-[#282232] rounded-3xl  py-2 px-6 flex flex-col items-center gap-2 text-white font-semibold justify-center max-w-64 min-w-14 hover:shadow-md transition-transform duration-300 ease-in-out`,
        className
      )}
    >
      <div
        className={`text-rose-300 text-xs font-semibold rounded-full  ${
          !notification ? "h-full transition-all  ease-linear duration-300" : "h-0"
        }`}
      >
        {!notification && "Please enter a valid email"}
      </div>

      <button
        // className={clsx(
        //   `bg-neutral-900 hover:bg-[#282232] rounded-full  py-2 px-6 flex gap-2 text-white font-semibold justify-center max-w-64 min-w-14 hover:shadow-md transition-transform duration-300 ease-in-out`,
        //   className
        // )}
        className="flex gap-2"
        onClick={onClick}
      >
        {type === "generate" && icon && icon}
        {children}
      </button>
    </div>
  );
};

export default Button;
