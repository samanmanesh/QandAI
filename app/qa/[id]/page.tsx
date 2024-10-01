import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-full w-full md:w-2/4 flex flex-col gap-3 justify-center items-center   ">
      My Post: {params.id}
    </div>
  );
}
