"use client";

import React, { useState } from "react";
import useQA from "../hooks/useQA";

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
  //   [
  //     {
  //         "question": "What type of deformity can result from zygomatic fractures?",
  //         "options": [
  //             "Flattening of the malar eminence",
  //             "Widening of the arch",
  //             "Orbital dystopia",
  //             "All of the above"
  //         ],
  //         "answer": "All of the above"
  //     },
  //     {
  //         "question": "What is the potential functional impairment caused by fractures of the zygomatic arch?",
  //         "options": [
  //             "Impingement on the temporalis muscle",
  //             "Obstruction of the path of the coronoid",
  //             "Trismus",
  //             "All of the above"
  //         ],
  //         "answer": "All of the above"
  //     },
  //     {
  //         "question": "What type of nerve injury is associated with zygomatic fractures?",
  //         "options": [
  //             "Paresthesia or dysesthesia of the first division of the trigeminal nerve (V1)",
  //             "Paresthesia or dysesthesia of the second division of the trigeminal nerve (V2)",
  //             "Paresthesia or dysesthesia of the third division of the trigeminal nerve (V3)",
  //             "None of the above"
  //         ],
  //         "answer": "Paresthesia or dysesthesia of the second division of the trigeminal nerve (V2)"
  //     }
  // ]
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);

  // const generateQA = async () => {
  //   setIsLoading(true);
  //   setError(null);
  //   try {
  //     let response: Response | null = null;
  //     if (inputType === "text") {
  //       response = await fetch("/api/text", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ text: inputValue }),
  //       });
  //     }

  //     if (!response) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Data:", data);
  //     return data.result.questions as Question[];
  //   } catch (err) {
  //     console.error("Error:", err);
  //     setError(err);
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleSubmit = async () => {
    const questions = await generateQA(inputType, inputValue);
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
      )}
    </div>
  );
};

export default QAPage;
