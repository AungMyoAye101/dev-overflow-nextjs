import { Question } from "@/components/Question";
import React from "react";

const page = () => {
  return (
    <div className="page-container flex-1 flex flex-col">
      <div>
        <h1 className="h1-bold">Question</h1>
      </div>
      <div>
        <Question />
      </div>
    </div>
  );
};

export default page;
