import Image from "next/image";
import React from "react";
import { FaCalendar, FaLink, FaLocationArrow } from "react-icons/fa";
import { UserProps } from "../type";
import Link from "next/link";

interface user {
  user: UserProps;
  clerkId: string | null;
}

const Profile = ({ user, clerkId }: user) => {
  const formattedDate = user.joinedAt
    ? new Date(user.joinedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";
  return (
    <section className="bg_dark_white p-4 rounded-md shadow dark:shadow-none">
      <div className="relative ">
        <div className="flex  gap-6 ">
          <Image
            src={user.picture!}
            width={100}
            height={100}
            className="object-cover  w-20 h-20  rounded-full"
            alt="profile image "
          />

          <div className="flex flex-col gap-4 ">
            <div className="flex flex-col gap-0.5">
              <h1 className="h2-bold capitalize ">{user.name}</h1>
              <p className="font-poppins text-xs text-black-card dark:text-secondary-white">
                {user.email}
              </p>
            </div>

            <p className="para w-fit  ">{user.bio ? user.bio : "add bio"}</p>

            <div className="flex gap-2 text-sm flex-wrap">
              <div className="flex gap-1 items-center">
                <FaLink />
                <span>
                  {user.portfolio ? (
                    <a href={user.portfolio} className="hover:text-accent-blue">
                      {user.portfolio}
                    </a>
                  ) : (
                    "example.com"
                  )}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <FaLocationArrow />
                <span>
                  {user.location ? user.location : "add your location"}
                </span>
              </div>
              <div className="flex gap-1 items-center">
                <FaCalendar />
                <span>{formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
        {user.clerkId === clerkId && (
          <Link
            href={"/profile/edit"}
            className="absolute right-2 top-2 button_bg rounded-lg shadow dark:shadow-none"
          >
            <p className=" font-poppins btn-bg px-4 py-1.5 text-nowrap text-sm rounded-md">
              Edit Profile
            </p>
          </Link>
        )}
      </div>
    </section>
  );
};

export default Profile;
