export type InputType = "text" | "pdf" | "image";

export interface QAResponse {
  question: string;
  options: string[];
  answer: string;
};

