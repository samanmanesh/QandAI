"use client";
import Card from "@/app/components/ui/Card";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse } from "@/app/types/qa";
import React, { useEffect, useState } from "react";
import { easeInOut, motion,} from "framer-motion";

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
      transition: { duration: 0.5, delay: 0.1, ease:"easeInOut",  },

    },
    exit: {
      x: direction === 1 ? -1000 : 1000,
      opacity: 0,
      transition: { duration: 0.5, delay: 0.1 ,ease:"easeInOut", },
    },
  };

  return (
    <div className="h-full w-full md:w-2/4 flex flex-col items-center justify-center">
      <div className="relative w-full  h-96 flex items-center justify-center overflow-hidden">
        <motion.div
          key={currentIndex}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          className="absolute w-full"
        >
          <Card data={questions[currentIndex]} />
        </motion.div>
      </div>

      {/* Pagination Controls */}
      <div className="flex gap-4 mt-4">
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handlePrev}
          disabled={questions.length === 1 || currentIndex === 0}
        >
          Prev
        </button>
        <button
          className="p-2 bg-blue-500 text-white rounded"
          onClick={handleNext}
          disabled={
            questions.length === 1 || currentIndex === questions.length - 1
          }
        >
          Next
        </button>
      </div>
      {/* Question Numbers */}
      <div className="flex gap-2 mt-4">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`p-2 rounded ${
              currentIndex === index
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-black"
            }`}
            onClick={() => handleSelectQuestion(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
