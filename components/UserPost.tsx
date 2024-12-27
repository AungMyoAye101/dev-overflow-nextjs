import React from "react";
import { Button } from "@/components/ui/button";
import Post from "@/components/Post";

const UserPost = () => {
  return (
    <div className="flex flex-col  gap-4">
      <div className="flex rounded-md overflow-hidden w-fit  font-poppins">
        <Button className="rounded-none active-link ">Top Post</Button>
        <Button className="rounded-none ">Answers</Button>
      </div>
      <div className="flex flex-col gap-6">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default UserPost;
