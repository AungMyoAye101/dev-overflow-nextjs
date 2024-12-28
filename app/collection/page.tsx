import Post from "@/components/Post";
import React from "react";
import { FaStar } from "react-icons/fa";

const page = () => {
  return (
    <section className="page_padding">
      <h1 className="h1-bold">Saved Questions</h1>
      <div className="flex flex-col gap-6 ">
        {Array(10)
          .fill(null)
          .map((t, i) => (
            <div key={i} className="flex bg_dark_white ">
              <Post />
              <FaStar className="text-orange text-2xl mt-10 mr-4" />
            </div>
          ))}
      </div>
    </section>
  );
};

export default page;
