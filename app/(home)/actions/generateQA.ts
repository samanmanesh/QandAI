"use server";
import anthropic from "@/app/lib/aiClient";

interface Params {
  data: string;
  file?: File;
}



export async function generateQA({ data, file }: Params): Promise<string> {
  // This is a placeholder for the generated QA

  const prompt = `Generate 3-5 multiple choice questions based on the following text. Each question should have 4 options, with one correct answer. Format the output as a JSON array of objects, where each object represents a question and has the following structure:

{
  "question": "The text of the question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "The correct option"
}

Text to base the questions on:

${data}

Ensure that the questions cover key points from the text and that the options are plausible but clearly distinguishable. The correct answer should be included among the options.`;
  let generatedQA = {};
    
try {

   const res = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      { role: "user", content: prompt },
      //https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/prefill-claudes-response#example-2-maintaining-character-in-roleplay-scenarios
      { role: "assistant", content: "{" },
    ],
  });
  
  generatedQA = res.content[0] 
  console.log(res.content[0]);

  
}
catch (error) {
  console.error(error);
  return "No QA generated";
}

  //its a Message object and we need to extract the content from it and return it as a json object
  
  

  //todo handling file latter with third party library(using relative action) based on the file type

  return  JSON.stringify(generatedQA);
  
}
