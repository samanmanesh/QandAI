'use server';

interface Params {
  prompt: string;
}

export async function generateQA( { prompt, file }: Params ): Promise<string>{
  // This is a placeholder for the generated QA 
  let generatedQA = "This is a placeholder for the generated QA + prompt: " + prompt;  

  //todo handling file latter with third party library(using relative action) based on the file type

  // passing the prompt to the AI model

  
  // return { prompt: "This is a placeholder for the generated QA", file: file };
  return generatedQA;
}