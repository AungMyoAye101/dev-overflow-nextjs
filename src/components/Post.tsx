import React from "react";
import { Badge } from "./ui/badge";
import { FaComment, FaEye, FaThumbsUp } from "react-icons/fa";
import Image from "next/image";

const Post = () => {
  return (
    <div className="flex flex-col gap-6 px-6 py-10 rounded-md shadow dark:shadow-none bg_dark_white">
      <h2 className="text-xl font-poppins font-bold">
        The Lightning Component c:LWC_PizzaTracker generated invalid output for
        field status. Error How to solve this
      </h2>
      <div className="flex items-center gap-4">
        <Badge className="px-3 py-1.5 font-poppins">Next JS</Badge>
        <Badge className="px-3 py-1.5 font-poppins">React JS</Badge>
        <Badge className="px-3 py-1.5 font-poppins">Node JS</Badge>
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-noto_serif">
          <Image
            src={"/assets/icons/site-logo.svg"}
            alt="user"
            width={25}
            height={25}
            className="rounded-full"
          />
          <h3 className="text-sm font-semibold ">user name</h3>

          <p className="text-xs">asked 2 min ago</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-noto_serif">
          <div className="flex items-center gap-1">
            <FaThumbsUp className="text-blue-600 cursor-pointer" />
            <p>1.2k Votes</p>
          </div>
          <div className="flex items-center gap-1">
            <FaComment className="text-blue-600 cursor-pointer" />
            <p>1.2k Answers</p>
          </div>
          <div className="flex items-center gap-1">
            <FaEye className="text-blue-600 cursor-pointer" />
            <p>1.2k Views</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
