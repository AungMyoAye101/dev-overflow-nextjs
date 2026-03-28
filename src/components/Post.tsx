"use client";
import { Badge } from "./ui/badge";
import Image from "next/image";
import { QuestionProps } from "../type";
import Link from "next/link";
import { timestamp } from "../lib/utils";
import EditDeleteAction from "./EditDeleteAction";
import { useSession } from "@/src/components/AuthProvider";
import { Eye, MessageSquare, Text, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
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
    <Card>
      <CardHeader>

        <div className="flex justify-between gap-4 items-start font-sans">
          <div className="flex items-center justify-center  gap-2">
            <Avatar size="lg">
              <AvatarImage src={user?.picture} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="">
              <h1 className="text-lg sm:font-xl font-medium">{user?.name}</h1>
              <p className="text-xs font-light ">{formatDate}</p>
            </div>

          </div>
          {user?._id === question.author._id && (
            <EditDeleteAction type="question" id={question._id!} />
          )}
        </div>
        <CardTitle>
          {question.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-20 bg-muted text-muted-foreground  overflow-hidden overflow-y-scroll scroll-smooth">

          <RenderText content={question.content} />
        </div>
        <div className="flex items-center gap-4 mt-4">
          {question.tags.map((tag) => (
            <Link href={`/tags/${tag._id}`} key={tag.name}>
              <Badge variant={'secondary'} className="px-4 py-2">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">





        </div>
      </CardContent>
      <CardFooter className="gap-4 bg-card">

        <Button variant={'outline'} size={'lg'} className="flex-1 rounded-lg">
          <ThumbsUp />
          <p>{question.upvotes?.length} Votes</p>
        </Button>
        <Button variant={'outline'} size={'lg'} className="flex-1 rounded-lg">
          <MessageSquare />
          <p>{question.answers?.length} Answers</p>
        </Button>
        <Button variant={'outline'} size={'lg'} className="flex-1 rounded-lg">
          <Eye />
          <p>{question.views} Views</p>
        </Button>

      </CardFooter>
    </Card>

  );
};

export default Post;
