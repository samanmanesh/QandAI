import React from "react";
import Sidebar from "../components/layout/Sidebar";

const QALayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className=" h-full flex    ">
      <Sidebar />
      {children}
    </section>
  );
};

export default QALayout;
