import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";

export interface CardProps {
  user: {
    name: string;
    clerkId: string;
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

const truncateTagName = (name: string, maxLength: number = 4): string => {
  return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
};

const Card = ({ user }: CardProps) => {
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="bg_dark_white flex flex-col justify-center items-center gap-4 px-4 py-6 shadow_rounded w-fit"
    >
      <Image
        src={user.picture!}
        width={40}
        height={40}
        alt="user photo"
        className="w-20 h-20 rounded-full "
      />

      <div className="text-center font-poppins">
        <h3 className="text-lg font-semibold">{user.name}</h3>
        <p className="text-sm font-noto_serif opacity-90">{user.email}</p>
      </div>
      <div className="flex gap-2 font-poppins text-sm">
        {user.questions[0].tags.map((tag) => (
          <Badge
            key={tag._id}
            className="px-2 py-1 button_bg hover:bg-accent-purple"
          >
            {truncateTagName(tag.name)}
          </Badge>
        ))}
      </div>
    </Link>
  );
};

export default Card;
