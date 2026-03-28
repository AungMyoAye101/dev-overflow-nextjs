import React from "react";
import { AnswerTypes } from "../type";
import { timestamp } from "../lib/utils";
import Link from "next/link";
import EditDeleteAction from "./EditDeleteAction";
import RenderText from "./RenderText";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

interface AnswerCardProps {
  answer: AnswerTypes;
  currUserId: string;
}

const AnswerCard = ({ answer, currUserId }: AnswerCardProps) => {
  const formatDate = timestamp(answer.createdAt);

  return (
    <Card key={answer._id} className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Link href={`/profile/${answer.author._id}`} className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={answer.author.picture} />
              <AvatarFallback>{answer.author.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-0.5">
              <CardTitle className="text-sm">{answer.author.name}</CardTitle>
              <p className="text-xs text-muted-foreground">{formatDate}</p>
            </div>
          </Link>

          {currUserId === answer.author._id && (
            <EditDeleteAction type="answer" id={answer._id} />
          )}
        </div>
      </CardHeader>

      <CardContent>
        <RenderText content={answer.content} />
      </CardContent>

      <CardFooter className="justify-between">
        <div className="flex items-center gap-1 text-sm">
          <ThumbsUp className="text-blue-600" />
          <p>{answer.upvotes?.length ?? 0} Votes</p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/question/${answer.question}`}>
            <MessageSquare />
            View question
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnswerCard;
