"use client";

import React, { useState } from "react";
import useQA from "../hooks/useQA";
import { InputType, QAResponse } from "../types/qa";
import Textarea from "./components/Textarea";
import Button from "../components/ui/Button";
import MagicIcon from "../assets/MagicIcon";
import { generateId } from "../utils/generateId";
import { useStore } from "zustand";
import { useQAStore } from "../store/qaStore";
import { useRouter } from "next/navigation";

const QAPage = () => {
  const [inputType] = useState<InputType>("text");
  const [inputValue, setInputValue] = useState("");
  // const [questions, setQuestions] = useState([] as Question[]);
  const [questions, setQuestions] = useState<QAResponse[]>([
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
  ]);
  const { generateQA, isLoading, error } = useQA();
  const router = useRouter();
  const setResult = useQAStore((state) => state.setQuestions);


  const handleSubmit = async () => {
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
    ]

    console.log("Questions:", questions);
    


    if (!isLoading && !error) setInputValue("");

    if (!questions) return;
    setQuestions(questions);
    //generate id 
    const id = generateId();
    // set questions in store
    // useQAStore((state) => state.setQuestions(id, questions));
    setResult(id, questions);


    router.push(`/qa/${id}`);
  };

  return (
    <div className="h-full w-full md:w-2/4 flex flex-col gap-3 justify-center items-center   ">
      <div className="min-w-12 flex flex-col gap-12  w-[85%] ">
        <section className=" flex flex-col gap-2  ">
          <h1 className="text-4xl font-medium">
            Welcome to
            <span className="text-4xl font-semibold"> QandAI, </span>
          </h1>
          <p className="text-2xl font-medium text-left">
            Drop your text below and watch questions come to life!
          </p>
        </section>
        <Textarea value={inputValue} onChange={setInputValue} />
        <Button
          type="generate"
          onClick={handleSubmit}
          className="mt-10 self-center w-full"
          icon={<MagicIcon />}
        >
          Generate
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
