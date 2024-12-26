import { Question } from "@/components/Question";
import { getUser } from "@/lib/actions/getUser";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const page = async () => {
  // const { clerId } = auth();

  const clerId = "clerk11223";
  if (!clerId) return;

  const userId = await getUser(clerId);
  console.log(userId);
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
