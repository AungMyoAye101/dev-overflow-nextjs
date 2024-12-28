import LocalSearchBox from "@/components/LocalSearchBox";
import { Badge } from "@/components/ui/badge";
import React from "react";

const page = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Tags</h1>
      <LocalSearchBox />
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {arr.map((i) => (
          <div
            key={i}
            className="bg_dark_white flex flex-col  gap-4 px-4 py-6 shadow_rounded w-fit"
          >
            <Badge className="py-2 px-4 w-fit">Next JS</Badge>
            <p className="text-sm font-noto_serif line-clamp-3">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est
              optio sed modi reprehenderit ipsa excepturi
            </p>
            <div className="font-noto_serif flex gap-2 text-sm">
              <span className="text-orange">1+</span>
              <span>Question</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
