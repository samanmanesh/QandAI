"use client";
import { create } from "zustand";
import { QAResponse, UserAnswer } from "../types/qa";



interface QAStore {
  questions: { [id: string]: QAResponse[] };
  userAnswers: { [id: string]: UserAnswer[] };
  setQuestions: (id: string, questions: QAResponse[]) => void;
  getQuestions: (id: string) => QAResponse[] | undefined;
  setUserAnswers: (
    id: string,
    questionId: string,
    selectedAnswer: string
  ) => void;
  getUserAnswers: (id: string) => UserAnswer[] | undefined;
}

export const useQAStore = create<QAStore>((set, get) => ({
  questions: {},
  userAnswers: {},
  setQuestions: (id, questions) =>
    set((state) => ({ questions: { ...state.questions, [id]: questions } })),
  getQuestions: (id) => get().questions[id],
  setUserAnswers: (id, questionId, selectedAnswer) =>
    set((state) => {
      const questions = state.questions[id];
      const question = questions.find((q) => q.question === questionId);
      const isCorrect = question ? question.answer === selectedAnswer : false;
      const UserAnswer: UserAnswer = { questionId, selectedAnswer, isCorrect };

      // Update the user answers
      const existingUserAnswers = state.userAnswers[id] || [];
      const updatedUserAnswers = existingUserAnswers.filter(
        (a) => a.questionId !== questionId
      );
      updatedUserAnswers.push(UserAnswer);

      return {
        userAnswers: { ...state.userAnswers, [id]: updatedUserAnswers },
      };
    }),
  getUserAnswers: (id) => get().userAnswers[id],
}));
