import React from "react";

const page = async ({ params }: any) => {
  const { questionId } = await params;

  return <div className="page_padding">page {questionId}</div>;
};

export default page;
