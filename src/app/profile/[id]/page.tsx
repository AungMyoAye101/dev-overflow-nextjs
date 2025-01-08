import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import { getUserInfo } from "@/src/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { userId: clerkId } = await auth();
  const result = await getUserInfo(id);
  if (!result) {
    return console.log("No result found");
  }

  return (
    <section className="page_padding">
      <Profile user={result.user} clerkId={clerkId} />
      <Stats
        totalQuestion={result.totalQuestions}
        totalAnswer={result.totalAnswers}
      />
      {/* <UserPost /> */}
    </section>
  );
};

export default page;
