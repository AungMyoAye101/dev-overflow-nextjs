import Link from "next/link";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";

export interface CardProps {
  user: {
    _id: string;
    name: string;
    picture: string;
    email: string;
    questions: {
      tags: {
        _id: string;
        name: string;
      }[];
    }[];
  };
}

const truncateTagName = (name: string, maxLength = 10): string => {
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};

const UserCard = ({ user }: CardProps) => {
  const userTags = user.questions?.[0]?.tags || [];

  return (
    <Card className="w-full max-w-sm border shadow-sm">
      <CardHeader>
        <Link href={`/profile/${user._id}`} className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={user.picture} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-base">{user.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </Link>
      </CardHeader>

      <CardContent>
        <div className="text-sm text-muted-foreground">
          {userTags.length > 0
            ? "Top tags from recent questions"
            : "No tags available yet"}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t bg-muted/40">
        {userTags.length > 0 ? (
          userTags.map((tag) => (
            <Badge key={tag._id} variant="secondary" className="px-2 py-1">
              {truncateTagName(tag.name)}
            </Badge>
          ))
        ) : (
          <Badge variant="outline" className="px-2 py-1">
            No tags
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default UserCard;
