import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";

import UserPost from "@/src/components/UserPost";
import { getUser } from "@/src/lib/actions/getUser";
import React from "react";

const Page = async () => {
  const res = await getUser();
  const user = res.user;
  console.log("user", user);
  return (
    <section className="pt-[8rem] pb-10 px-4 md:px-10 space-y-6">
      <Profile
        name={user.name || null}
        username={user.username}
        email={user.email}
        picture={user.picture}
      />
      <Stats />
      <UserPost />
    </section>
  );
};

export default Page;
