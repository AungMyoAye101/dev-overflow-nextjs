import Image from "next/image";
import React from "react";
import { FaCalendar, FaLink, FaLocationArrow } from "react-icons/fa";
import { Button } from "./ui/button";

const Profile = () => {
  return (
    <section className="bg_dark_white p-4 rounded-md shadow dark:shadow-none">
      <div className="flex justify-between ">
        <div className="flex items-start gap-4 ">
          <Image
            src={"/assets/icons/site-logo.svg"}
            width={100}
            height={100}
            className="rounded-full size-32"
            alt="profile image"
          />
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-poppins font-semibold capitalize">
                JS Mystery
              </h1>
              <p className="font-poppins text-xs opacity-95">js@gmail.com</p>
            </div>
            <div className="flex gap-4 items-center text-sm">
              <div className="flex gap-1 items-center">
                <FaLink />
                <span>js.pro.com</span>
              </div>
              <div className="flex gap-1 items-center">
                <FaLocationArrow />
                <span>Mandalay</span>
              </div>
              <div className="flex gap-1 items-center">
                <FaCalendar />
                <span>joined Feburary 2024</span>
              </div>
            </div>
            <p className="font-noto_serif text-sm ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              consequuntur assumenda, ipsa fugit molestiae sit. Ipsam optio
              officia magnam unde, consequatur ab? Neque dolor veritatis eos
              animi, dignissimos voluptas debitis.
            </p>
          </div>
        </div>

        <Button className="mt-4 font-poppins btn-bg">Edit Profile</Button>
      </div>
    </section>
  );
};

export default Profile;
