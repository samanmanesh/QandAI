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

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data.answer;
    
    } catch (err) {
      console.error("Error:", err);
      setError(err.message);
      return null;
    } finally {
      console.log("Finally");
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-yellow-100">
      <input
        className="border rounded bg-slate-500"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="border  bg-black text-white font-medium p-2 rounded-md"
        onClick={() => generateQA()}
      >
        {" "}
        Click to generate
      </button>
    </div>
  );
};

export default QAPage;
