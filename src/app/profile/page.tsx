import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";

import UserPost from "@/src/components/UserPost";
import { getUser } from "@/src/lib/actions/getUser";
import React from "react";

const Page = async () => {
  const res = await getUser();
  const user = res?.user;
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <section className="page_padding">
      <Profile user={user} />
      <Stats />
      <UserPost />
    </section>
  );
};

export default Page;
