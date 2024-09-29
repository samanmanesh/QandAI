"use client";

import { ApiError } from "next/dist/server/api-utils";
import React, { useState } from "react";

type Props = {};

type Question = {
  question: string;
  options: string[];
  answer: string;
};

const QAPage = (props: Props) => {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  // const [questions, setQuestions] = useState([] as Question[]);
  const [questions, setQuestions] = useState<Question[]>([
    {
        "question": "What is the composition of the encoder?",
        "options": [
            "The encoder is composed of 4 identical layers",
            "The encoder is composed of 8 identical layers",
            "The encoder is composed of 6 identical layers",
            "The encoder is composed of 2 identical layers"
        ],
        "answer": "The encoder is composed of 6 identical layers"
    },
    {
        "question": "What are the two sub-layers in each encoder layer?",
        "options": [
            "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network",
            "Residual connection and layer normalization",
            "Embedding layers and decoder sub-layers",
            "Convolutional layers and pooling layers"
        ],
        "answer": "Multi-head self-attention mechanism and a position-wise fully connected feed-forward network"
    },
    {
        "question": "What is the purpose of the residual connections and layer normalization in the model?",
        "options": [
            "To facilitate the residual connections and ensure the outputs have the same dimension as the input",
            "To improve the training speed and convergence of the model",
            "To prevent overfitting and improve the model's generalization",
            "All of the above"
        ],
        "answer": "To facilitate the residual connections and ensure the outputs have the same dimension as the input"
    }
]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQA = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let response: Response | null = null;
      if (inputType === "text") {
        response = await fetch("/api/text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: inputValue }),
        });
      }

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data:", data);
      return data.result.questions as Question[];
    } catch (err) {
      console.error("Error:", err);
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const questions = await generateQA();
    console.log("Questions:", questions);
    if (!questions) return;
    setQuestions(questions);
  };

  return (
    <div className="h-full w-full  flex flex-col gap-3 items-center justify-center">
      <h1 className="text-4xl font-bold">QandAI</h1>
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
      {questions && <div>{questions.map(
        (q, i) => (
          <div key={i} className="border p-2 rounded-md">
            <div>{q.question}</div>
            <div>
              {q.options.map((o, j) => (
                <div key={j}>{o}</div>
              ))}
            </div>
            <div>Answer: {q.answer}</div>
          </div>
        )
      )}</div>}
    </div>
  );
};

export default QAPage;
