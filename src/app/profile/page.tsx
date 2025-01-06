import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import { getUser } from "@/src/lib/actions/user.action";
import React from "react";

const Page = async () => {
  const user = await getUser();

  return (
    <section className="page_padding">
      <Profile user={user} />
      <Stats />
    </section>
  );
};

export default Page;
