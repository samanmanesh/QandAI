"use client";
import { useState } from "react";
import { InputType, QAResponse } from "../types/qa";

export default function useQA() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQA = async (
    type: InputType,
    value: string
  ): Promise<QAResponse[] | null> => {
    setIsLoading(true);
    setError(null);
    try {
      let response: Response | null = null;
      if (type === "text") {
        response = await fetch("/api/text", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: value }),
        });
      }

      if (!response) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Data:", data);
      return data.result.questions as QAResponse[];
    } catch (err) {
      console.error("Error:", err);
      setError(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    generateQA,
  };
}
