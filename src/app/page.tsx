import LocalSearchBox from "@/src/components/LocalSearchBox";
import Post from "@/src/components/Post";
import { auth } from "@clerk/nextjs/server";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col gap-10   custom-scrollbar pt-[8rem] pb-10  px-4 md:px-10 bg-light-gray dark:bg-black border-2 ">
      <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center w-full ">
        <h1 className="text-2xl md:text-4xl font-poppins font-semibold">
          All Questions
        </h1>
        <Link
          href={"/question"}
          className="self-end btn-bg font-poppins  font-semibold py-2 px-4 rounded-md "
        >
          Ask a Question
        </Link>
      </div>
      <div>
        <LocalSearchBox />
      </div>
      <div className="flex flex-col gap-4">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}
