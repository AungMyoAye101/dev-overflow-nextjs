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
          <div className="flex items-center gap-2">



            <Avatar>
              <AvatarImage src={user?.picture} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1>{user?.name}</h1>
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
        <div className="flex items-center gap-4">
          {question.tags.map((tag) => (
            <Link href={`/tags/${tag._id}`} key={tag.name}>
              <Badge className="">
                {tag.name}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">


          <p className="text-xs dark:text-dark-secondary-text">{formatDate}</p>


        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-4">

        <div className="flex items-center gap-1">
          <ThumbsUp className=" cursor-pointer" />
          <p>{question.upvotes?.length} Votes</p>
        </div>
        <div className="flex items-center gap-1">
          <MessageSquare className=" cursor-pointer" />
          <p>{question.answers?.length} Answers</p>
        </div>
        <div className="flex items-center gap-1">
          <Eye className=" cursor-pointer" />
          <p>{question.views} Views</p>
        </div>

      </CardFooter>
    </Card>

  );
};

export default Post;
