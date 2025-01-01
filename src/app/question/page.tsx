import { Question } from "@/src/components/Question";

import React from "react";

const page = async () => {
  return (
    <div className="page-container flex-1 flex flex-col">
      <div>
        <h1 className="h1-bold">Question</h1>
      </div>
      <div>
        <Question formType="Create" />
      </div>
    </div>
  );
};

export default page;
