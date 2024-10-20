"use client";

import { useState } from "react";
import useQA from "../hooks/useQA";
import { InputType } from "../types/qa";
import Textarea from "./components/Textarea";
import Button from "../components/ui/Button";
import MagicIcon from "../assets/MagicIcon";
import { generateId } from "../utils/generateId";
import { useQAStore } from "../store/qaStore";
import { useRouter } from "next/navigation";
import { BlobBackground } from "./components/BlobBackground";
import { motion } from "framer-motion";
import ErrorIcon from "../assets/ErrorIcon";

const QAPage = () => {
  const [inputType] = useState<InputType>("text");
  const [inputValue, setInputValue] = useState<string>("");
  // const [questions, setQuestions] = useState<QAResponse[] | null>(null);

  const { generateQA, isLoading, error } = useQA();
  const router = useRouter();
  const { setQuestions: setStoreQuestions } = useQAStore();
  const [customError, setCustomError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // if the input value is empty string or undefined, return
    if (!inputValue || inputValue.length < 5) {
      setCustomError("Input value should be at least 5 characters long.");

      return;
    }

    if (inputValue.length > 2000) {
      setCustomError("Input value should be less than 2000 characters long.");
      return;
    }

    // const questions = await generateQA(inputType, inputValue);
    //!tmp
    const questions = [
      {
        question: "What is the composition of the encoder?",
        options: [
          "The encoder is composed of 4 identical layers",
          "The encoder is composed of 8 identical layers",
          "The encoder is composed of 6 identical layers",
          "The encoder is composed of 2 identical layers",
        ],
        answer: "The encoder is composed of 6 identical layers",
      },
      {
        question: "What are the two sub-layers in each encoder layer?",
        options: [
          "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
          "Residual connection and layer normalization",
          "Embedding layers and decoder sub-layers",
          "Convolutional layers and pooling layers",
        ],
        answer:
          "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
      },
      {
        question:
          "What is the purpose of the residual connections and layer normalization in the model?",
        options: [
          "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
          "To improve the training speed and convergence of the model",
          "To prevent overfitting and improve the model's generalization",
          "All of the above",
        ],
        answer:
          "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
      },
    ];
    // const questions = [
    //   {
    //     question:
    //       "What is the most common cosmetic deformity associated with zygomatic fractures?",
    //     options: [
    //       "Flattening of the malar eminence",
    //       "Widening of the arch",
    //       "Orbital dystopia",
    //       "Enophthalmos",
    //     ],
    //     answer: "Flattening of the malar eminence",
    //   },
    //   {
    //     question:
    //       "What is the most common functional impairment caused by zygomatic arch fractures?",
    //     options: [
    //       "Impingement on the temporalis muscle",
    //       "Obstruction of the coronoid process",
    //       "Paresthesia of the trigeminal nerve",
    //       "Diplopia",
    //     ],
    //     answer: "Impingement on the temporalis muscle",
    //   },
    //   {
    //     question:
    //       "Which of the following is a common neurological complication of zygomatic fractures?",
    //     options: [
    //       "Paresthesia of the first division of the trigeminal nerve",
    //       "Dysesthesia of the second division of the trigeminal nerve",
    //       "Paralysis of the facial nerve",
    //       "Numbness of the mandibular nerve",
    //     ],
    //     answer: "Dysesthesia of the second division of the trigeminal nerve",
    //   },
    // ];

    console.log("Questions:", questions);

    if (!isLoading && !error) setInputValue("");

    if (!questions) {
      setCustomError(
        "An error occurred while generating questions. Please try again later."
      );
      return;
    }

    //generate id
    const id = generateId();
    // set questions in store
    setStoreQuestions(id, questions);
    router.push(`/qa/${id}`);
  };

  return (
    <BlobBackground className=" h-full w-full lg:w-2/4 flex flex-col gap-3 justify-center items-center">
    
      <div className="relative min-w-12 flex flex-col gap-6 w-[85%] ">
        <section className="flex flex-col gap-1">
          <motion.h1
            className="text-4xl font-medium text-neutral-900 "
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            Welcome to
            <span className="text-4xl font-semibold font-inter"> Q&AI, </span>
          </motion.h1>
          <motion.p
            className="text-2xl font-medium text-neutral-900 text-left"
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Drop your text below and watch questions come to life!
          </motion.p>
        </section>
        <Textarea
          value={inputValue}
          onChange={(value) => {
            setInputValue(value);
            setCustomError(null);
          }}
          notification={"Please provide a valid input"}
        />
        <motion.section
          className="flex flex-col gap-1 w-full"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <Button
            type="generate"
            onClick={handleSubmit}
            className={`md:mt-8 self-center w-full group  transition  duration-100 ease-in-out ${
              isLoading && "bg-[#282232]"
            }`}
            icon={
              !isLoading && <MagicIcon className=" w-5 fill-white group-hover:fill-indigo-200 " />
            }
          >
            {!isLoading && !error && (
              <span className="group-hover:text-indigo-200">Generate</span>
            )}
            {isLoading && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                fill="none"
                viewBox="0 0 48 48"
                className="animate-spin"
              >
                <path
                  stroke="url(#a)"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={8}
                  d="M4 24c0 11.046 8.954 20 20 20s20-8.954 20-20S35.046 4 24 4"
                />
                <defs>
                  <linearGradient
                    id="a"
                    x1={24}
                    x2={4}
                    y1={4}
                    y2={27}
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#210C4E" />
                    <stop offset={0.503866} stopColor="#4C426C" />
                    <stop offset={1} stopColor="#826896" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </Button>
        </motion.section>
      </div>
      {customError && (
        <motion.div
          className="px-4 py-2  bg-white text-rose-700  rounded-md  font-base absolute bottom-8  flex items-center justify-center gap-1 "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.1 }}
        >
          <ErrorIcon className="w-6 h-6 inline-block  fill-rose-700" />
          {customError}{" "}
        </motion.div>
      )}
    </BlobBackground>
  );
};

export default QAPage;
