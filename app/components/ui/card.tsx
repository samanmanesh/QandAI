'use client';
import { QAResponse } from "@/app/types/qa";
import React from "react";

interface CardProps {
  data: QAResponse;
}
const Card = ({data}: CardProps ) => {
  console.log(">>", data);
  return (
    <div className="w-full h-96 bg-white rounded-lg shadow-lg p-4">
      <div className="text-lg font-semibold">{data.question}</div>
      <div className="flex flex-col gap-2">
        
      </div>
    </div>
  );
};

export default Card;
