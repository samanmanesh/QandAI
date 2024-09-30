import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateQA(text: string) {
  const prompt = `Generate 3-5 multiple choice questions based on the following text. Each question should have 4 options, with one correct answer. Format the output as a JSON array of objects, where each object represents a question and has the following structure:

{
  "question": "The text of the question",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "answer": "The correct option"
}

Text to base the questions on:

{${text}}

Ensure that the questions cover key points from the text and that the options are plausible but clearly distinguishable. The correct answer should be included among the options.`;

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [
      { role: "user", content: prompt },
      { role: "assistant", content: '{"questions":' },
    ],
  });

  console.log("response", response);
  return response.content[0].type === "text"
    ? JSON.parse('{"questions":' + response.content[0].text)
    : null;
}
