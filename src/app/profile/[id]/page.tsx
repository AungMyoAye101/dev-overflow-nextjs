import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import UserQuestion from "@/src/components/UserQuestion";
import { getUserInfo } from "@/src/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import UserAnswers from "@/src/components/UserAnswers";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const { userId: clerkId } = await auth();
  const res = await getUserInfo(id);
  if (!res) {
    return console.log("No result found");
  }
  const result = JSON.parse(JSON.stringify(res));
  return (
    <section className="page_padding">
      <Profile user={result.user} clerkId={clerkId} />
      <Stats
        totalQuestion={result.totalQuestions}
        totalAnswer={result.totalAnswers}
        badges={result.badgeCount}
      />
      <Tabs defaultValue="question">
        <TabsList className="overflow-hidden  bg_dark_white shadow-md dark:shadow-none ">
          <TabsTrigger value="question" className="p-2 rounded-none">
            Top Questions
          </TabsTrigger>
          <TabsTrigger value="answer" className="p-2 rounded-none">
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="question" className="mt-4">
          <UserQuestion userId={result.user._id} />
        </TabsContent>
        <TabsContent value="answer" className="mt-4">
          <UserAnswers userId={result.user._id} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
