"use client";
import Card from "@/app/components/ui/Card";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse } from "@/app/types/qa";
import React, { useEffect, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import NextIcon from "@/app/assets/NextIcon";
import PrevIcon from "@/app/assets/PrevIcon";

// export default function Page({ params }: { params: { id: string } }) {
//   // getting the data with id from the params from store
//   console.log("params.id", params.id);
//   const getData = useQAStore((state) => state.getQuestions);
//   let questions: QAResponse[] | undefined = getData(params.id);
//   console.log("questions1", questions);
//   // useEffect(() => {
//   //    questions = getData(params.id);
//   //    console.log("questions2", questions);
//   // }
//   // , [params.id]);

//   if (!questions) return <div>Not Found</div>;

//   //todo: here we use the animated pagination to show each question one by one

//   return (
//     <div className="h-full w-full bg-slate-50 md:w-2/4 flex gap-8 overflow-hidden">
//       {questions.map((question, index) => (
//         <Card key={index} data={question}  />
//       ))}

//     </div>
//   );
// }

export default function Page({ params }: { params: { id: string } }) {
  const getData = useQAStore((state) => state.getQuestions);
  const questions: QAResponse[] | undefined = getData(params.id);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // 1 for next, -1 for prev

  if (!questions) return <div>Not Found</div>;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
  };

  const handleSelectQuestion = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: {
      x: direction === 1 ? 1000 : -1000,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: 0.1, ease: "easeInOut" },
    },
    exit: {
      x: direction === 1 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.5, delay: 0.1, ease: "easeInOut" },
    },
  };

  return (
    <div className="h-full w-full md:w-2/4 flex flex-col items-center justify-center">
      <div className="relative w-full h-1/2 flex items-center justify-center overflow-hidden">
        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="absolute h-full max-w-[40rem]"
        >
          <Card data={questions[currentIndex]} />
        </motion.div>
      </div>

      <section className="flex flex-row-reverse justify-around  gap-4 w-full">
      {/* Pagination Controls */}
      <div className="flex gap-4 mt-4">
        <button
          className="px-4 py-2 bg-black text-white rounded-full  hover:scale-105 transform transition-all"
          onClick={handlePrev}
          disabled={questions.length === 1 || currentIndex === 0}
        >
          <PrevIcon />
        </button>
        <button
          className="px-4 py-2 bg-black text-white rounded-full hover:scale-105 transform transition-all"
          onClick={handleNext}
          disabled={
            questions.length === 1 || currentIndex === questions.length - 1
          }
        >
          <NextIcon />
        </button>
      </div>
      {/* Question Numbers */}
      <div className="flex gap-1 mt-4">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`p-0.5 w-7 h-7 font-semibold text rounded-full ${
              currentIndex === index
                ? "bg-indigo-950 text-white scale-105"
                : "bg- text-black scale-75 hover:scale-125"
            } hover:bg-indigo-950 hover:text-white  transform transition-all
                `}
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
