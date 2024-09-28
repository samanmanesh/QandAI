"use client";
import React, { useState } from "react";

import { generateQA } from "../actions/generateQA";

// type Props = {};
type Answer = {
  question: string;
  options: string[];
  answer: string;
};

const QAGeneratorForm = () => {
  const [prompt, setPrompt] = useState({ prompt: "" });
  const [result, setResult] = useState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await generateQA({ data: prompt.prompt });
      console.log("res: ",  res);
      //make string to json
      const resJson = JSON.parse(res);
      console.log("resJson: ",  resJson);
      setResult(resJson);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-3 ">
        <textarea
          id="text"
          name="text"
          rows={10}
          cols={50}
          className="border rounded p-2"
          onChange={(e) => setPrompt({ prompt: e.target.value })}
        ></textarea>
        <button
          type="submit"
          onClick={handleSubmit}
          className="border rounded-md px-4 py-2 mx-auto hover:bg-slate-900 hover:text-white duration-300 ease-in-out"
        >
          Generate
        </button>
      </form>

      {result && (
        <div className="flex flex-col gap-3">
          <h2>Generated QA</h2>
          


          {/* {result.map((qa: any, index: number) => (
            <div key={index} className="flex flex-col gap-2">
              <h3>Question: {qa.question}</h3>
              <ul>
                {qa.options.map((option: string, index: number) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>
              <p>Answer: {qa.answer}</p>
            </div>
          ))} */}
        </div>
      )}
    </div>
  );
};

export default QAGeneratorForm;
