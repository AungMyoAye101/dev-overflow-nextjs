import ProfileEdit from "@/src/components/ProfileEdit";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) return;
  return (
    <>
      <ProfileEdit clerkId={userId} />
    </>
  );
};

export default Page;
