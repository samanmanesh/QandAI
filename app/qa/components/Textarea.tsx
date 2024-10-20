'use client';
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  notification?: string;
}

const Textarea = ({ value, onChange, notification }: TextareaProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Check if textarea has been scrolled
  const handleScroll = () => {
    if (textareaRef.current) {
      setIsScrolled(textareaRef.current.scrollTop > 0);
    }
  };

  // Attach scroll listener on mount and detach on unmount
  useEffect(() => {
    const textareaElement = textareaRef.current;
    if (textareaElement) {
      textareaElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (textareaElement) {
        textareaElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  //border border-neutral-300

  return (
    <motion.div className="relative rounded-xl overflow-hidden">
      {/* Navigation Bar */}
      {isScrolled && (
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-white/90 to-white/5    z-10"
        >
          {/* Nav content can go here if needed */}
        </motion.div>
      )}
      {/* bg-[#F3F3F3] */}
      {/* Textarea */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, filter: "blur(6px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <motion.div>
          <textarea
            className=" min-h-52 w-full aspect-[16/7] resize-none rounded-xl overflow-auto outline-none p-4    text-base font-medium tracking-wide custom-scrollbar bg-[#FFFF] shadow-sm"
            // className=" w-full aspect-[16/7] resize-none rounded-xl overflow-auto outline-none p-4    text-base font-medium tracking-wide custom-scrollbar  bg-gradient-to-br from-[#f7f7f7]  via-[#ffffff] to-[#f5f5f5] shadow-sm"
            placeholder="Enter or paste your text here...  "
            onChange={(e) => {
              onChange(e.target.value);
            }}
            value={value}
            ref={textareaRef}
            autoFocus
          />
        </motion.div>
        {!notification && (
          <div className="absolute top-full rounded-md py-1 px-2 font-medium text-lg text-rose-600 ">
            {notification}
          </div>
        )}
      </motion.div>
      {/* Navigation Bar */}
    </motion.div>
  );
};

export default Textarea;
