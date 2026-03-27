import ProfileEdit from "@/src/components/ProfileEdit";
import { getUserById } from "@/src/lib/actions/user.action";
import { getCurrentUser } from "@/src/lib/auth/session";
import React from "react";
import { redirect } from "next/navigation";

const Page = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/sign-in");
  }
  const user = await getUserById(currentUser._id.toString());

  return (
    <>
      <ProfileEdit user={JSON.parse(JSON.stringify(user))} />
    </>
  );
};

export default Page;
