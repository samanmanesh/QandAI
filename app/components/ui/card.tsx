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
      className="h-full  p-6 space-y-4 flex flex-col justify-between items-start  rounded-lg flex-grow-0"
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
      <motion.section className="my-auto">
        <motion.h1
          className="text-2xl font-bold mb-8 "
          variants={fadeInVariants}
          // variants={headerVariants}
          custom={0.5} // delay for h1
        >
          {question.question}
        </motion.h1>

        {/* Animate the options */}
        {question.options.map((option, index) => (
          <motion.p
            key={option}
            className=" text-lg font-medium flex items-center gap-3 cursor-pointer rounded-md p-2 group"
            variants={fadeInVariants}
            custom={0.3 + index * 0.1} // incremental delay for options
            onClick={() => onAnswer(option)}
          >
            <input
              type="checkbox"
              id="vehicle1"
              name="vehicle1"
              value={option}
              className={`appearance-none   w-4 h-4 shadow-sm rounded-md  outline outline-1 flex-shrink-0 group-hover:bg-slate-950 cursor-pointer hover:transition-all group-hover:ease-in-out  transition-all ${
                userAnswer?.selectedAnswer === option ? "bg-black" : "bg-white"
              }  `}
            />
            <span
              className={`${
                option !== question.answer &&
                showAnswer &&
                "line-through decoration-red-900"
              }
            ${option === question.answer && showAnswer && "text-emerald-700 "}
            `}
            >
              {option}
            </span>
          </motion.p>
        ))}
      </motion.section>
      {/* Show answer button */}
      <motion.section className="min-h-24 w-full mt-auto flex flex-col justify-end">
        {!showAnswer ? (
          <motion.button
            className="font-semibold text-medium border-t-2 border-black p-1 rounded- mx-auto "
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
            ref={buttonRef}
          >
            Reveal Answer
          </motion.button>
        ) : showAnswer ? (
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
