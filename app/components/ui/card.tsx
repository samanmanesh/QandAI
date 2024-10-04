import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import { animate } from "framer-motion/dom";
import { filter } from "framer-motion/client";

// Define animation variants for children
const fadeInVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.7 },
    filter: "blur(0px)",
  }),
};

const fadeInAndOutVariants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.5 },
    filter: "blur(0px)",
  },
};

const slideDownVariants = {
  hidden: { opacity: 1, y: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: [0, 20],
    transition: { duration: 0.7 },
    filter: "blur(0px)",
  },
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2 },
    filter: "blur(0px)",
  },
};

interface QuestionAnswerProps {
  question: QAResponse;
  onAnswer: (selectedAnswer: string) => void;
  userAnswer?: UserAnswer;
}
const Card = ({ question, onAnswer, userAnswer }: QuestionAnswerProps) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isButtonAnimating, setIsButtonAnimating] = useState(false); // Button animation state
  const [startAnimating, setStartAnimating] = useState(false); // Button animation state
  const buttonRef = useRef(null);

  return (
    <motion.div
      className="h-full  px-11 py-16 space-y-4 flex flex-col justify-between   rounded-xl flex-grow-0 border border-neutral-300"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.2, // Stagger the children animations
          },
        },
      }}
    >
      {/* Animate the question */}
      <motion.section className=" w-full">
        <motion.h1
          className="text-2xl font-bold mb-8 "
          variants={fadeInVariants}
          // variants={headerVariants}
          custom={0.1} // delay for h1
        >
          {question.question}
        </motion.h1>

        {/* Animate the options */}
        {question.options.map((option, index) => (
          <motion.div
            key={option}
            className={` text-lg font-medium flex items-center gap-4 cursor-pointer rounded-md p-2 mb-3 group ${
              option === question.answer && showAnswer && "bg-emerald-50  "
            } ${!showAnswer && "hover:bg-slate-50 "} `}
            variants={fadeInVariants}
            custom={0.02 + index * 0.1} // incremental delay for options
            onClick={() => {
              onAnswer(option);
              setShowAnswer(true); // Toggle the answer after the button animation is done
            }}
          >
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value={option}
              className={`appearance-none   w-5 h-5 shadow-sm rounded border border-neutral-300 flex-shrink-0  cursor-pointer hover:transition-all group-hover:ease-in-out group-hover:duration-100 group-hover:delay-75 transition-all ${
                userAnswer?.selectedAnswer === option
                  ? "bg-neutral-400"
                  : "bg-white"
              }  `}
            />
            <span
              className={`${
                option !== question.answer && showAnswer && "opacity-75  "
              }
            ${option === question.answer && showAnswer && "text-emerald-700  "}
            ${
              userAnswer?.selectedAnswer === option &&
              !userAnswer?.isCorrect &&
              showAnswer &&
              " text-rose-700 not-line-through"
            }
            
            `}
            >
              {option}
            </span>
          </motion.div>
        ))}
      </motion.section>
      {/* Show answer button */}
      <motion.section className="min-h-24 w-full mt-auto flex flex-col justify-end">
        {/* {!showAnswer ? (
          <motion.button
            className="font-semibold text-medium  border-black p-1  mx-auto  w-full "
            onClick={() => {
              animate(
                buttonRef.current,
                { opacity: 0, y: -30, filter: "blur(6px)" },
                { duration: 0.2 }
              );
              setTimeout(() => {
                setShowAnswer(true); // Toggle the answer after the button animation is done
              }, 200);
            }}
            variants={slideDownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onHoverStart={() => {
              animate(
                buttonRef.current,
                { scale: 1.05 },
                { duration: 0.2, ease: "easeInOut" }
              );
            }}
            onHoverEnd={() => {
              animate(
                buttonRef.current,
                { scale: 1 },
                { duration: 0.2, ease: "easeInOut" }
              );
            }}
            ref={buttonRef}
          >
            Reveal Answer
          </motion.button>
        )   */}
        {showAnswer ? (
          <motion.p
            className="p-1 text-lg font-medium"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
          >
            Answer: {question.answer}
          </motion.p>
        ) : null}
      </motion.section>
    </motion.div>
  );
};

export default Card;
