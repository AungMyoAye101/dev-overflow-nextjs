import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { UserProps } from "../type";

interface CardProps {
  user: UserProps;
}

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
        {user.questions[0].tags.map((tag: any) => (
          <Link href={tag._id} key={tag._id} className="px-3 py-1.5 button_bg">
            {tag.name}
          </Link>
        ))}
        {/* <Badge className="px-3 py-1.5 button_bg hover:bg-accent-purple">
          Node
        </Badge>
        <Badge className="px-3 py-1.5 button_bg hover:bg-accent-purple">
          Node
        </Badge>
        <Badge className="px-3 py-1.5 button_bg hover:bg-accent-purple">
          Node
        </Badge> */}
      </div>
    </Link>
  );
};

export default Card;
