"use client";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import { useState } from "react";
import { motion } from "framer-motion";
import NextIcon from "@/app/assets/NextIcon";
import PrevIcon from "@/app/assets/PrevIcon";
import RotateIcon from "@/app/assets/RotateIcon";
import { useRouter } from "next/navigation";
import QnACard from "@/app/components/ui/QnACard";

export default function Page({ params }: { params: { id: string } }) {
  const { getQuestions, getUserAnswers, setUserAnswers, restedUserAnswers } =
    useQAStore();
  const questions: QAResponse[] | undefined = getQuestions(params.id);
  const userAnswers: UserAnswer[] | undefined = getUserAnswers(params.id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  if (!questions) {
    // push user back to generation page if no questions are found
    return router.push("/qa");
  }

  const handleAnswer = (selectedAnswer: string) => {
    setUserAnswers(params.id, questions[currentIndex].question, selectedAnswer);
  };

  const handleRestartAnswers = () => {
    setCurrentIndex(0);
    restedUserAnswers(params.id);
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
          className="h-full rounded  xl:w-[65%] relative p-2"
        >
          <QnACard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers?.find(
              (ua) => ua.questionId === questions[currentIndex].question
            )}
          />
          <div className="absolute bottom-6 right-8 font-medium text-base tracking-wide font-inter  ">
            {currentIndex + 1}/{questions.length}
          </div>
        </motion.div>
      </div>
      <section className=" p-4 flex flex-col items-center  justify-around gap-8 w-full">
        {/* Pagination Controls */}
        <div
          className={`group flex  bg-neutral-900 rounded-full text-white  px-3 py-2 w-52 hover:shadow `}
        >
          <button
            className="w-full justify-start  transform transition-all hover:scale-90 disabled:opacity-50  disabled:hover:scale-100"
            onClick={handlePrev}
            disabled={questions.length === 1 || currentIndex === 0}
          >
            <PrevIcon className="stroke-current scale-90 " />
          </button>
          {
            //if user has answered all questions we show the restart button
            userAnswers?.length === questions.length && (
              <button
                className="text-white transform transition-all hover:scale-90   disabled:hover:scale-100"
                onClick={handleRestartAnswers}
              >
                <RotateIcon className="stroke-current" />
              </button>
            )
          }
          <button
            className="w-full flex justify-end transform transition-all hover:scale-90 hover:shadow   disabled:opacity-50  disabled:hover:scale-100  "
            onClick={handleNext}
            disabled={
              questions.length === 1 || currentIndex === questions.length - 1
            }
          >
            <NextIcon className="stroke-current scale-90" />
          </button>
        </div>

        <div className="flex gap-2 ">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`p-0.5 w-6 h-6 font-semibold text-sm rounded-full ${
                currentIndex === index
                  ? "bg-neutral-900 text-white scale-105"
                  : "scale-75 hover:scale-110"
              } hover:bg-neutral-900 hover:text-white transform transition-all`}
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
