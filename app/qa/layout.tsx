import React from "react";
import Sidebar from "../components/layout/Sidebar";

const QALayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full flex w-full " tabIndex={-1}>
      <Sidebar />
      {children}
    </section>
  );
};

export default QALayout;
