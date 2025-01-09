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
      />
      <Tabs defaultValue="account" className="">
        <TabsList>
          <TabsTrigger value="question">Top Questions</TabsTrigger>
          <TabsTrigger value="answer">Answers</TabsTrigger>
        </TabsList>
        <TabsContent value="question">
          <UserQuestion userId={result.user._id} />
        </TabsContent>
        <TabsContent value="answer">
          <UserAnswers userId={result.user._id} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default page;
