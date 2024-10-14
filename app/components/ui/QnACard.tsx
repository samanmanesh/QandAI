"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import CheckBox from "./CheckBox";

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
const QnACard = ({ question, onAnswer, userAnswer }: QuestionAnswerProps) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (userAnswer?.selectedAnswer) {
      setShowAnswer(true);
    } else {
      setShowAnswer(false);
    }
  }, [userAnswer]);
  return (
    <motion.div
      className="h-full overflow-auto px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 space-y-4 flex flex-col justify-between   rounded-xl flex-grow-0 border border-neutral-300"
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
          className="text-md lg:text-2xl font-semibold mb-8 "
          variants={fadeInVariants}
          custom={0.1} // delay for h1
        >
          {question.question}
        </motion.h1>

        {/* Animate the options */}
        {question.options.map((option, index) => (
          <motion.div
            key={option}
            className={` text-base lg:text-base font-medium flex items-center gap-4 cursor-pointer rounded-lg p-2 mb-3 group  font-serif
              ${
                option === question.answer &&
                showAnswer &&
                "bg-emerald-100 text-emerald-900  "
              } 
            ${!showAnswer && "hover:bg-slate-50 "}
            ${
              userAnswer?.selectedAnswer === option &&
              !userAnswer?.isCorrect &&
              showAnswer &&
              " text-rose-900  bg-rose-100"
            } 
              
            `}
            variants={fadeInVariants}
            custom={0.02 + index * 0.1} // incremental delay for options
            onClick={() => {
              if (showAnswer) return;
              onAnswer(option);
              setShowAnswer(true); // Toggle the answer after the button animation is done
            }}
          >
            <CheckBox
              clicked={userAnswer?.selectedAnswer === option}
              onClick={() => {
                if (showAnswer) return;
                onAnswer(option);
                setShowAnswer(true); // Toggle the answer after the button animation is done
              }}
              disabled={showAnswer}
              className={`
                ${
                  userAnswer?.selectedAnswer !== option &&
                  !showAnswer &&
                  "group-hover:bg-neutral-300 transition-all "
                }`}
            />

            <span
              className={`${
                option !== question.answer && showAnswer && "opacity-75  "
              }
            `}
            >
              {option}
            </span>
          </motion.div>
        ))}
      </motion.section>
      <motion.section className="md:min-h-24 w-full mt-auto flex flex-col justify-end">
        {showAnswer ? (
          <motion.p
            className="p-1 text-lg font-serif"
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
          >
            <span className="  text-base ">
              Answer: <br />{" "}
            </span>
            {question.answer}
          </motion.p>
        ) : null}
      </motion.section>
    </motion.div>
  );
};

export default QnACard;
