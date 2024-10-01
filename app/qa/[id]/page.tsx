"use client";
import Card from "@/app/components/ui/Card";
import { useQAStore } from "@/app/store/qaStore";
import { QAResponse } from "@/app/types/qa";
import React, { useEffect } from "react";

export default function Page({ params }: { params: { id: string } }) {
  // getting the data with id from the params from store
  console.log("params.id", params.id);
  const getData = useQAStore((state) => state.getQuestions);
  let questions: QAResponse[] | undefined = getData(params.id);
  console.log("questions1", questions);
  // useEffect(() => {
  //    questions = getData(params.id);
  //    console.log("questions2", questions);
  // }
  // , [params.id]);

  if (!questions) return <div>Not Found</div>;

//todo: here we use the animated pagination to show each question one by one


  return (
    <div className="h-full w-full md:w-2/4 flex flex-col gap-3 justify-center items-center   ">
      {questions.map((question) => (
        <Card key={question.question} {...question} />
      ))}
    </div>
  );
}
