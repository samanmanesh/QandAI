"use client";
import Card from "@/app/components/ui/Card";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import { useState } from "react";
import { motion } from "framer-motion";
import NextIcon from "@/app/assets/NextIcon";
import PrevIcon from "@/app/assets/PrevIcon";
import RotateIcon from "@/app/assets/RotateIcon";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { getQuestions, getUserAnswers, setUserAnswers, restedUserAnswers } =
    useQAStore();
  // const getData = useQAStore((state) => state.getQuestions);
  const questions: QAResponse[] | undefined = getQuestions(params.id);
  const userAnswers: UserAnswer[] | undefined = getUserAnswers(params.id);

  const [currentIndex, setCurrentIndex] = useState(0);



  if (!questions) return <div className="flex flex-col gap-4 w-full md:w-2/4 items-center justify-center">
    <h1 className="text-3xl font-bold mb-4">No questions found ‼️</h1>
    <p className="text-lg font-medium">Please generate questions first</p>
    <Link href="/qa">
      <button className="text-md font-bold bg-neutral-900 rounded-lg text-white py-2 px-4 ">Return to generation page</button>
    </Link>
  </div>;

  const handleAnswer = (selectedAnswer: string) => {
    setUserAnswers(params.id, questions[currentIndex].question, selectedAnswer);
  };

  const handleRestartAnswers = () => {
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
          {
            //if user has answered all questions we show the restart button
            userAnswers?.length === questions.length && (
              <button
                className="text-white transform transition-all hover:scale-90   disabled:hover:scale-100"
                onClick={handleRestartAnswers}
              >
                <RotateIcon />
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
            <NextIcon />
          </button>
        </div>

        <div className="flex gap-2 ">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`p-0.5 w-6 h-6 font-semibold text-sm rounded-full ${
                currentIndex === index
                  ? "bg-[#2B2B2B] text-white scale-105"
                  : "scale-75 hover:scale-110"
              } hover:bg-[#2B2B2B] hover:text-white transform transition-all`}
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
