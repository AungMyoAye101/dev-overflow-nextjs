import Link from "next/link";
import { Calendar, Link2, Pin } from "lucide-react";
import { UserProps } from "../type";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface UserProfileProps {
  user: UserProps;
  currentUserId: string | null;
}

const Profile = ({ user, currentUserId }: UserProfileProps) => {
  const formattedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";

  return (
    <Card className="border shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Avatar size="lg" className="size-20">
            <AvatarImage src={user.picture} />
            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <CardTitle className="text-2xl capitalize">{user.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <p className="text-sm">{user.bio || "Add a short bio"}</p>
          </div>
        </div>

        {user._id === currentUserId && (
          <Button asChild size="sm">
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        )}
      </CardHeader>

      <CardContent className="flex flex-wrap gap-3 text-sm">
        <Badge variant="secondary" className="gap-1 px-3 py-1">
          <Link2 className="size-4" />
          {user.portfolio ? (
            <a href={user.portfolio} className="hover:underline" target="_blank" rel="noreferrer">
              {user.portfolio}
            </a>
          ) : (
            <span>example.com</span>
          )}
        </Badge>

        <Badge variant="secondary" className="gap-1 px-3 py-1">
          <Pin className="size-4" />
          {user.location || "Add your location"}
        </Badge>

        <Badge variant="secondary" className="gap-1 px-3 py-1">
          <Calendar className="size-4" />
          {formattedDate}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default Profile;
