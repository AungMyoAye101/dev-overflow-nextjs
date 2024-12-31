import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "./ui/badge";
import { ProfileCardProps } from "../type";
interface CardProps {
  key?: number;
  user: ProfileCardProps;
}

const Card = ({ user, key }: CardProps) => {
  return (
    <Link
      key={key}
      href={`/profile/${user.link}`}
      className="bg_dark_white flex flex-col justify-center items-center gap-4 px-4 py-6 shadow_rounded w-fit"
    >
      <Image src={user.picture!} width={40} height={40} alt="user photo" />

      <div className="text-center font-poppins">
        <h3 className="text-lg font-semibold">{user.username}</h3>
        <p className="text-sm font-noto_serif opacity-90">{user.email}</p>
      </div>
      <div className="flex gap-2 font-poppins text-sm">
        <Badge className="px-3 py-1.5 ">Node</Badge>
        <Badge className="px-3 py-1.5 ">Node</Badge>
        <Badge className="px-3 py-1.5 ">Node</Badge>
      </div>
    </Link>
  );
};

export default Card;
