import React from "react";

const QALayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="p-2 h-full w-full grid items-center justify-center  ">
      <nav className="border p-6">This is the home layout</nav>
      {children}
    </section>
  );
};

export default QALayout;
