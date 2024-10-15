import { cn } from "@/app/utils/cn";
import { motion } from "framer-motion";
import React, { useState } from "react";

type Props = {
  clicked: boolean;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

const Input = ({ clicked, onClick, className, disabled }: Props) => {
  const [isScaledDown, setIsScaledDown] = useState(false);

  const handleOnClick = () => {
    setIsScaledDown(true); // Scale down
    setTimeout(() => {
      setIsScaledDown(false); // Scale back up after 200ms
    }, 200);

    onClick(); // Trigger the parent onClick action
  };

  //clicked ? "bg-[#2B2B2B]" : "bg-[#DDDDDD]"
  return (
    <motion.div
      className={cn(
        `w-4 h-4 md:w-5 md:h-5 rounded md:rounded-md flex flex-shrink-0 items-center justify-center ${
          clicked ? "bg-[#2B2B2B]" : "bg-white shadow-sm border"
        }`,
        className
      )}
      onClick={disabled ? undefined : handleOnClick}
      animate={{ scale: isScaledDown ? 0.9 : clicked ? 1 : 1 }}
      transition={{ duration: 0.2 }} // Adjust the duration to make it smoother
    >
      {clicked && (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={18}
          height={18}
          fill="none"
          viewBox="0 0 18 18"
          animate={{ opacity: clicked ? 1 : 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          <motion.path
            initial={{ pathLength: 0, pathOffset: 1 }}
            animate={{ pathLength: 1, pathOffset: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
              staggerChildren: 0.8,
            }}
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m15 4.5-8.25 8.25L3 9"
          />
        </motion.svg>
      )}
    </motion.div>
  );
};

export default Input;
