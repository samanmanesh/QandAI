'use client';
import React, { useState } from "react";

import { generateQA } from "../actions/generateQA";

// type Props = {};

const QAGeneratorForm = () => {
  const [prompt, setPrompt] = useState({ prompt: "" });
  const [result, setResult] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const prompt = (document.getElementById("text") as HTMLTextAreaElement)
      .value;
    const res = await generateQA({ prompt });
    console.log(res);
    setResult(res);
  }
  catch (error) {
    console.error(error);
  }
}

  

  
  return (
    <div>
      <form className="flex flex-col gap-3 " >
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
          <p>{result}</p>
        </div>
      )}
    </div>
  );
};

export default QAGeneratorForm;
