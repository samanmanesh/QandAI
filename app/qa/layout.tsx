import React from "react";
import Sidebar from "../components/layout/Sidebar";
import { AuroraBackground } from "./components/AuroraBackground";

const QALayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="h-full flex w-full ">
      {/* // <AuroraBackground> */}
        <Sidebar />
        {children}
      {/* {children} */}
      {/* </AuroraBackground> */}
    </section>
  );
};

export default QALayout;
