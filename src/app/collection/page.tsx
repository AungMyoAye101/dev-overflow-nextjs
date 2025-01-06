import Post from "@/src/components/Post";
import { getSavedQuestion } from "@/src/lib/actions/question.action";

import React from "react";

const page = async () => {
  const user = await getSavedQuestion();
  if (!user) {
    return console.log("No queston found  ");
  }
  console.log(user);
  return (
    <section className="page_padding">
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="flex flex-col gap-6 ">
        {user.saved.length > 0 ? (
          user.saved.map((q: any) => <Post key={q.title} question={q} />)
        ) : (
          <div>You have no saved question </div>
        )}
      </div>
    </section>
  );
};

export default page;
