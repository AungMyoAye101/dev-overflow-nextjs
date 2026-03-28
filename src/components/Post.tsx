"use client";
import { Badge } from "./ui/badge";
import { QuestionProps } from "../type";
import Link from "next/link";
import { timestamp } from "../lib/utils";
import EditDeleteAction from "./EditDeleteAction";
import { useSession } from "@/src/components/AuthProvider";
import { ArrowRight, Eye, MessageSquare, ThumbsUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import RenderText from "./RenderText";

interface PostProps {
  question: QuestionProps;
  ownProfile?: boolean;
}

const Post = ({ question }: PostProps) => {
  const formatDate = timestamp(question.createdAt);
  const { user } = useSession();

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex justify-between gap-4 items-start font-sans">
          <Link
            href={`/profile/${question.author._id}`}
            className="flex items-center justify-center gap-2"
          >
            <Avatar size="lg">
              <AvatarImage src={question.author.picture} />
              <AvatarFallback>{question.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-base font-medium">{question.author.name}</h2>
              <p className="text-xs text-muted-foreground">{formatDate}</p>
            </div>
          </Link>
          {user?._id === question.author._id && (
            <EditDeleteAction type="question" id={question._id!} />
          )}
        </div>
        <CardTitle>
          <Link href={`/question/${question._id}`} className="hover:underline">
            {question.title}
          </Link>
        </CardTitle>
        <CardDescription>
          Preview of the question details from the post body.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RenderText
          content={question.content}
          maxHeightClassName="max-h-32"
          seeMoreHref={`/question/${question._id}`}
        />
        <div className="flex items-center gap-4 mt-4">
          {question.tags.map((tag) => (
            <Link href={`/tags/${tag._id}`} key={tag.name}>
              <Badge variant="secondary" className="px-3 py-1">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="gap-2 bg-card">
        <Button variant="outline" size="sm" className="flex-1">
          <ThumbsUp />
          <p>{question.upvotes?.length ?? 0}</p>
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <MessageSquare />
          <p>{question.answers?.length ?? 0}</p>
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Eye />
          <p>{question.views ?? 0}</p>
        </Button>
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href={`/question/${question._id}`} aria-label="Go to detail">
            <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;
