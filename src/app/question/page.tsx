import QuestionForm from "@/src/components/Question";
import React from "react";

const page = async () => {
  return (
    <div className="page-container flex-1 flex flex-col">
      <h1 className="h1-bold">Create Question</h1>
      <div>
        <QuestionForm formType="create" />
      </div>
    </div>
  );
};

export default page;
