"use client";

import { ApiError } from "next/dist/server/api-utils";
import React, { useState } from "react";

type Props = {};

const QAPage = (props: Props) => {
  const [inputType, setInputType] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [answer, setAnswer] = useState("");
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
      return data.message;
    } catch (err) {
      console.error("Error:", err);
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const answer = await generateQA();
    console.log("Answer:", answer);
    setAnswer(answer);
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
      {answer && <div>{answer}</div>}
    </div>
  );
};

export default QAPage;
