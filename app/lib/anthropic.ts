import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateQA(text: string) {
  const prompt = `Given the following text, generate a multiple-choice question. Provide four answer options, and specify which one is the correct answer. Ensure that the question and the answer options are relevant to the content of the text and that only one answer is correct.

Text: [${text}]

Question: [Generated question based on the text]
Options:
[Option 1]
[Option 2]
[Option 3]
[Option 4]
Correct Answer: [Insert correct answer here]"
  `;

  const response = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 300,
    messages: [
      { role: "user", content: prompt },
      { role: "assistant", content: "{" },
    ],
  });
  return response.content;
}
