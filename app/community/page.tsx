import LocalSearchBox from "@/components/LocalSearchBox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import React from "react";

const page = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Users</h1>
      <LocalSearchBox />

      {/* Grid container */}
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {arr.map((i) => (
          <div
            key={i}
            className="bg_dark_white flex flex-col justify-center items-center gap-4 px-4 py-6 shadow_rounded w-fit"
          >
            <Image
              src={"/assets/icons/gold.svg"}
              width={40}
              height={40}
              alt="user photo"
            />

            <div className="text-center font-poppins">
              <h3 className="text-lg font-semibold">Zeuly Moe</h3>
              <p className="text-sm font-noto_serif opacity-90">
                zeu@gmail.com
              </p>
            </div>
            <div className="flex gap-2 font-poppins text-sm">
              <Badge className="px-3 py-1.5 ">Node</Badge>
              <Badge className="px-3 py-1.5 ">Node</Badge>
              <Badge className="px-3 py-1.5 ">Node</Badge>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default page;
