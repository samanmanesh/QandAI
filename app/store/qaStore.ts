"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { QAResponse } from "../types/qa";

interface QAStore {
  questions: { [id: string]: QAResponse[] };
  setQuestions: (id: string, questions: QAResponse[]) => void;
  getQuestions: (id: string) => QAResponse[] | undefined;
}

export const useQAStore = create<QAStore>((set, get) => ({
  questions: {},
  setQuestions: (id, questions) =>
    set((state) => ({ questions: { ...state.questions, [id]: questions } })),
  getQuestions: (id) => get().questions[id],
}));
