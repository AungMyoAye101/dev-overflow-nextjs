import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import { getUserByClerkId } from "@/src/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { userId: clerkId } = await auth();
  const user = await getUserByClerkId(id);
  if (!user) {
    return console.log("user not find");
  }

  return (
    <section className="page_padding">
      <Profile user={user} clerkId={clerkId} />
      <Stats />
      {/* <UserPost /> */}
    </section>
  );
};

export default page;
