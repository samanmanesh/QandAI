"use client";
import Card from "@/app/components/ui/Card";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import { useState } from "react";
import { motion } from "framer-motion";
import NextIcon from "@/app/assets/NextIcon";
import PrevIcon from "@/app/assets/PrevIcon";

export default function Page({ params }: { params: { id: string } }) {
  const { getQuestions, getUserAnswers, setUserAnswers } = useQAStore();
  // const getData = useQAStore((state) => state.getQuestions);
  const questions: QAResponse[] | undefined = getQuestions(params.id);
  const userAnswers: UserAnswer[] | undefined = getUserAnswers(params.id);

  const [currentIndex, setCurrentIndex] = useState(0);

  console.log("questions", questions);
  console.log("userAnswers", userAnswers);

  if (!questions) return <div>Not Found</div>;

  const handleAnswer = (selectedAnswer: string) => {
    setUserAnswers(params.id, questions[currentIndex].question, selectedAnswer);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5, delay: 0.1, ease: "easeInOut" },
    },
  };

  return (
    <div className="w-full md:w-2/4 flex flex-col gap-8 items-center justify-center overflow-auto ">
      <div className="w-full h-full md:h-2/3 flex flex-col items-center justify-around ">
        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="h-full rounded lg:w-[37rem] relative"
        >
          <Card
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers?.find(
              (ua) => ua.questionId === questions[currentIndex].question
            )}
          />
          <div className="absolute bottom-6 right-8 font-medium text-lg tracking-wide bg-blur-sm ">
            {currentIndex + 1}/{questions.length}
          </div>
        </motion.div>
      </div>
      <section className=" flex flex-col items-center  justify-around gap-8 w-full">
        {/* Pagination Controls */}
        <div
          className={`group flex  bg-neutral-900 rounded-full text-white  px-4 py-2 w-44 hover:shadow `}
        >
          <button
            className="w-full justify-start  transform transition-all hover:scale-90 disabled:opacity-50  disabled:hover:scale-100"
            onClick={handlePrev}
            disabled={questions.length === 1 || currentIndex === 0}
          >
            <PrevIcon />
          </button>
          <button
            className="w-full flex justify-end transform transition-all hover:scale-90 hover:shadow   disabled:opacity-50  disabled:hover:scale-100  "
            onClick={handleNext}
            disabled={
              questions.length === 1 || currentIndex === questions.length - 1
            }
          >
            <NextIcon />
          </button>
        </div>
        {/* Question Numbers */}
        <div className="flex gap-2 ">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`p-0.5 w-6 h-6 font-semibold text-sm rounded-full ${
                currentIndex === index
                  ? "bg-black text-white scale-105"
                  : "scale-75 hover:scale-110"
              } hover:bg-black hover:text-white transform transition-all`}
              onClick={() => handleSelectQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
