import Profile from "@/components/Profile";
import Stats from "@/components/Stats";
import React from "react";

const page = () => {
  return (
    <section className="pt-[8rem] pb-10 px-4 md:px-10 space-y-6">
      <Profile />
      <Stats />
    </section>
  );
};

export default page;
