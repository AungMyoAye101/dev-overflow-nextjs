import ProfileEdit from "@/src/components/ProfileEdit";
import { getUser } from "@/src/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) return;
  const user = await getUser();

  return (
    <>
      <ProfileEdit user={JSON.parse(JSON.stringify(user))} />
    </>
  );
};

export default Page;
