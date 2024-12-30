import { SignIn } from "@clerk/nextjs";
import React from "react";

const page = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center page_padding">
      <SignIn />
    </div>
  );
};

export default page;
