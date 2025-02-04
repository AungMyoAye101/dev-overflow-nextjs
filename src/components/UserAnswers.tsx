import { UserQuestionProps } from "./UserQuestion";
import { getUserAnswers } from "../lib/actions/answer.action";
import AnswerCard from "./AnswerCard";
import Empty from "./Empty";

const UserAnswers = async ({ userId }: UserQuestionProps) => {
  const results = await getUserAnswers(userId);
  if (!results) {
    throw new Error("results not found !");
  }

  const { answers } = JSON.parse(JSON.stringify(results));

  return (
    <div className="flex flex-col gap-4">
      {answers.length > 0 ? (
        answers.map((a: any) => (
          <AnswerCard key={a._id} answer={a} currUserId={userId} />
        ))
      ) : (
        <Empty
          title="There is no question to show"
          desecription="  Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved!"
          link="/question"
          btn="ask a question"
        />
      )}
    </div>
  );
};

export default UserAnswers;
