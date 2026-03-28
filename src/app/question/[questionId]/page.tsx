import AllAnswer from "@/src/components/AllAnswer";
import Answer from "@/src/components/AnswerForm";
import { Badge } from "@/src/components/ui/badge";
import Votes from "@/src/components/Votes";
import { getQuestionById } from "@/src/lib/actions/question.action";
import { timestamp } from "@/src/lib/utils";
import Image from "next/image";
import Link from "next/link";
import RenderText from "@/src/components/RenderText";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/src/lib/auth/session";
import { Clock, Eye, MessageSquare, TextQuote } from "lucide-react";

interface PageProps {
  params: Promise<{ questionId: string }>;
  searchParams: Promise<{ filter: string; page?: number }>;
}

const page = async ({ params, searchParams }: PageProps) => {
  const { questionId } = await params;
  const { filter } = await searchParams;
  const res = await getQuestionById(questionId);
  const question = JSON.parse(JSON.stringify(res));
  const formattedDate = timestamp(question.createdAt);
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }
  const currUserId = user._id.toString();

  return (
    <section className="page_padding">
      <div className="w-full flex flex-col gap-6 bg_dark_white px-6 py-6 rounded-lg shadow-md dark:shadow-none  ">
        {/* User profile and votes */}
        <div className="flex justify-between items-center ">
          <Link
            href={`/profile/${question.author._id}`}
            className="flex items-center gap-2"
          >
            <Image
              src={question.author.picture}
              width={40}
              height={40}
              alt={`${question.author.name} profile`}
              className="w-8 h-8 rounded-full"
            />
            <h1 className="font-semibold font-poppins ">
              {question.author.name}
            </h1>
          </Link>
          {/* 
          <Votes
            itemId={question._id}
            userId={currUserId}
            upVotes={question.upvotes.length}
            downVotes={question.downvotes.length}
            hasUpvoted={question.upvotes.includes(currUserId)}
            hasDownvoted={question.downvotes.includes(currUserId)}
            hasSaved={user.saved.includes(question._id)}
            type="question"
          /> */}
        </div>

        <div className="flex flex-col gap-4 ">
          <h1 className="h2-bold">{question.title}</h1>

          <div className="flex items-center gap-3 text-sm font-noto_serif">
            <div className="flex items-center gap-1">
              <Clock className="text-blue-600 cursor-pointer" />
              <p>{formattedDate} </p>
            </div>

            <div className="flex items-center gap-1">
              <MessageSquare className="text-blue-600 cursor-pointer" />
              <p>{question.answers.length} Answers</p>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="text-blue-600 cursor-pointer" />
              <p>{question.views} Views</p>
            </div>
          </div>
          <div className="text-wrap">
            <RenderText content={question.content} />
          </div>
          <div className="flex items-center gap-4 ">
            {question.tags.map((tag: { _id: string; name: string }) => (
              <Badge
                key={tag._id}
                className="px-4 py-1.5 bg-accent-blue hover:bg-accent-purple"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Answers */}
      {/* <AllAnswer questionId={question._id} filter={filter} />

      <Answer questionId={question._id} /> */}
    </section>
  );
};

export default page;
