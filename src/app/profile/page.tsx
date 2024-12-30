import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";

import UserPost from "@/src/components/UserPost";
import React from "react";

const page = () => {
  return (
    <section className="pt-[8rem] pb-10 px-4 md:px-10 space-y-6">
      <Profile />
      <Stats />
      <UserPost />
    </section>
  );
};

export default page;
