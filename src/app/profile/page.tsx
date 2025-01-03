import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";

import UserPost from "@/src/components/UserPost";
import { getUser } from "@/src/lib/actions/getUser";
import React from "react";

const Page = async () => {
  const user = await getUser();

  return (
    <section className="page_padding">
      <Profile user={user} />
      <Stats />
      {/* <UserPost /> */}
    </section>
  );
};

export default Page;
