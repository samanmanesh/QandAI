"use client";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse, UserAnswer } from "@/app/types/qa";
import { useEffect, useState } from "react";
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

  const [screenHeight, setScreenHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );

  // Update screen height on window resize
  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


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
    <div className="relative h-full w-full md:w-2/4 flex flex-col gap-8 items-center justify-center">
      <div className="w-full h-full flex flex-col items-center justify-around ">
        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="rounded xl:w-[65%] my-auto  min-h-[42rem] relative p-2 "
        >
          <QnACard
            question={questions[currentIndex]}
            onAnswer={handleAnswer}
            userAnswer={userAnswers?.find(
              (ua) => ua.questionId === questions[currentIndex].question
            )}
          />
          <div className=" absolute bottom-8 right-8 font-medium text-base tracking-wide font-inter  ">
            {currentIndex + 1}/{questions.length}
          </div>
        </motion.div>
      </div>
      {/* Pagination Controls */}
      <motion.section
        className="absolute bottom-10 rounded-full flex  items-center  justify-around gap-8 "
        drag="y" // Restrict to vertical dragging only
        dragConstraints={{
          top: -(screenHeight - 120), // Allow dragging up with 24px padding
          bottom: -24, // Allow dragging down with 24px padding
        }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 10,
          hardness: 0.5,
        }}
        style={{ cursor: "grab" }}
      >
        <div
          className={`group gap-4 justify-between flex  bg-neutral-900 rounded-full text-white  px-3 py-2  hover:shadow min-w-[20rem] md:min-w-[25rem] `}
        >
          <div className="flex gap-2 " style={{ cursor: "pointer" }}>
            {questions.map((_, index) => (
              <button
                key={index}
                className={` relative z-10 p-0.5 w-6 h-6 font-semibold text-sm rounded-full ${
                  currentIndex === index
                    ? "text-neutral-900 scale-105"
                    : "scale-75 hover:scale-105"
                } hover:bg-white hover:text-neutral-900 transform transition-all`}
                onClick={() => handleSelectQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
            {/* Moving circle div */}
            <div
              className={`absolute  p-0.5 w-6 h-6 bg-white rounded-full z-0 transform transition-transform duration-300`}
              style={{
                transform: `translateX(${currentIndex * (24 + 8)}px)`, // 24px width + 8px gap between buttons
              }}
            />
          </div>

          <div className="w-0.5 rounded  bg-gray-50/10 " />

          <button
            className="text-white transform transition-all hover:scale-90   disabled:hover:scale-100 disabled:opacity-50"
            onClick={handleRestartAnswers}
            disabled={userAnswers?.length !== questions.length}
          >
            <RotateIcon className="stroke-current" />
          </button>

          <div className="w-0.5 rounded  bg-gray-50/10 " />

          <div
            className="flex gap-2  rounded-full  px-1 w-1/3"
            style={{ cursor: "pointer" }}
          >
            <button
              className="w-1/2 justify-start transform transition-all hover:scale-90 disabled:opacity-50  disabled:hover:scale-100"
              onClick={handlePrev}
              disabled={questions.length === 1 || currentIndex === 0}
            >
              <PrevIcon className="stroke-current scale-90 " />
            </button>

            <button
              className="w-1/2 flex justify-end transform transition-all hover:scale-90 hover:shadow   disabled:opacity-50  disabled:hover:scale-100  "
              onClick={handleNext}
              disabled={
                questions.length === 1 || currentIndex === questions.length - 1
              }
            >
              <NextIcon className="stroke-current scale-90" />
            </button>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
