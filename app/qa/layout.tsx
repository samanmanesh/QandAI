import React from "react";

const QALayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="p-2 h-full   ">
      {children}
    </section>
  );
};

export default QALayout;
