export type InputType = "text" | "pdf" | "image";

export interface QAResponse {
  question: string;
  options: string[];
  answer: string;
};

export interface UserAnswer {
  questionId: string; // is the unique key with the question itself
  selectedAnswer: string;
  isCorrect: boolean;
}