"use client";

import { useState } from "react";
import useQA from "../hooks/useQA";
import { InputType, QAResponse } from "../types/qa";
import Textarea from "./components/Textarea";
import Button from "../components/ui/Button";
import MagicIcon from "../assets/MagicIcon";
import { generateId } from "../utils/generateId";
import { useQAStore } from "../store/qaStore";
import { useRouter } from "next/navigation";

const QAPage = () => {
  const [inputType] = useState<InputType>("text");
  const [inputValue, setInputValue] = useState<string>("");
  const [questions, setQuestions] = useState<QAResponse[] | null>(null);
  // const [questions, setQuestions] = useState<QAResponse[]>([
  //   {
  //     question: "What is the composition of the encoder?",
  //     options: [
  //       "The encoder is composed of 4 identical layers",
  //       "The encoder is composed of 8 identical layers",
  //       "The encoder is composed of 6 identical layers",
  //       "The encoder is composed of 2 identical layers",
  //     ],
  //     answer: "The encoder is composed of 6 identical layers",
  //   },
  //   {
  //     question: "What are the two sub-layers in each encoder layer?",
  //     options: [
  //       "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
  //       "Residual connection and layer normalization",
  //       "Embedding layers and decoder sub-layers",
  //       "Convolutional layers and pooling layers",
  //     ],
  //     answer:
  //       "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
  //   },
  //   {
  //     question:
  //       "What is the purpose of the residual connections and layer normalization in the model?",
  //     options: [
  //       "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
  //       "To improve the training speed and convergence of the model",
  //       "To prevent overfitting and improve the model's generalization",
  //       "All of the above",
  //     ],
  //     answer:
  //       "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
  //   },
  // ]);
  const { generateQA, isLoading, error } = useQA();
  const router = useRouter();
  const { setQuestions: setStoreQuestions } = useQAStore();
  const [customError, setCustomError] = useState<string | null>(null);

  const handleSubmit = async () => {
    // if the input value is empty string or undefined, return
    if (!inputValue) {
      setCustomError("Please provide a valid input");
      return;
    }

    // const questions = await generateQA(inputType, inputValue);
    //!tmp  
    // const questions = [
    //   {
    //     question: "What is the composition of the encoder?",
    //     options: [
    //       "The encoder is composed of 4 identical layers",
    //       "The encoder is composed of 8 identical layers",
    //       "The encoder is composed of 6 identical layers",
    //       "The encoder is composed of 2 identical layers",
    //     ],
    //     answer: "The encoder is composed of 6 identical layers",
    //   },
    //   {
    //     question: "What are the two sub-layers in each encoder layer?",
    //     options: [
    //       "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
    //       "Residual connection and layer normalization",
    //       "Embedding layers and decoder sub-layers",
    //       "Convolutional layers and pooling layers",
    //     ],
    //     answer:
    //       "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
    //   },
    //   {
    //     question:
    //       "What is the purpose of the residual connections and layer normalization in the model?",
    //     options: [
    //       "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
    //       "To improve the training speed and convergence of the model",
    //       "To prevent overfitting and improve the model's generalization",
    //       "All of the above",
    //     ],
    //     answer:
    //       "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
    //   },
    // ];
    const questions = [
      {
        question:
          "What is the most common cosmetic deformity associated with zygomatic fractures?",
        options: [
          "Flattening of the malar eminence",
          "Widening of the arch",
          "Orbital dystopia",
          "Enophthalmos",
        ],
        answer: "Flattening of the malar eminence",
      },
      {
        question:
          "What is the most common functional impairment caused by zygomatic arch fractures?",
        options: [
          "Impingement on the temporalis muscle",
          "Obstruction of the coronoid process",
          "Paresthesia of the trigeminal nerve",
          "Diplopia",
        ],
        answer: "Impingement on the temporalis muscle",
      },
      {
        question:
          "Which of the following is a common neurological complication of zygomatic fractures?",
        options: [
          "Paresthesia of the first division of the trigeminal nerve",
          "Dysesthesia of the second division of the trigeminal nerve",
          "Paralysis of the facial nerve",
          "Numbness of the mandibular nerve",
        ],
        answer: "Dysesthesia of the second division of the trigeminal nerve",
      },
    ];

    console.log("Questions:", questions);

    if (!isLoading && !error) setInputValue("");

    if (!questions) return;
    setQuestions(questions);
    //generate id
    const id = generateId();
    // set questions in store
    setStoreQuestions(id, questions);

    router.push(`/qa/${id}`);
  };

  return (
    <div className=" h-full w-full md:w-2/4 flex flex-col gap-3 justify-center items-center   ">
      <div className="min-w-12 flex flex-col gap-12 w-[85%]">
        <section className="flex flex-col gap-2">
          <h1 className="text-4xl font-medium">
            Welcome to
            <span className="text-4xl font-semibold"> Q&AI, </span>
          </h1>
          <p className="text-2xl font-medium text-left">
            Drop your text below and watch questions come to life!
          </p>
        </section>
        <Textarea value={inputValue} onChange={setInputValue} notification={"Please provide a valid input"} />
        <Button
          type="generate"
          onClick={handleSubmit}
          className="mt-10 self-center w-full group hover:gap-1 transition  duration-100 ease-in-out"
          icon={!isLoading && <MagicIcon className="group-hover:scale-95" />}
        >
          {!isLoading && !error && (
            <span className="group-hover:scale-95">Generate</span>
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
      </div>

      {/* <h1 className="text-4xl font-bold">QandAI</h1>
      <textarea
        className="border rounded bg-slate-100 p-2 w-96 min-h-48 "
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="border  bg-black text-white font-medium p-2 rounded-md"
        onClick={handleSubmit}
      >
        {" "}
        Click to generate
      </button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {questions && (
        <div>
          {questions.map((q, i) => (
            <div key={i} className="border p-2 rounded-md">
              <div>{q.question}</div>
              <div>
                {q.options.map((o, j) => (
                  <div key={j}>{o}</div>
                ))}
              </div>
              <div>Answer: {q.answer}</div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default QAPage;
