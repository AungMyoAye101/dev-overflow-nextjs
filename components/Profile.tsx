import Image from "next/image";
import React from "react";
import { FaCalendar, FaLink, FaLocationArrow } from "react-icons/fa";

const Profile = () => {
  return (
    <section>
      <div className="flex gap-4">
        <div>
          <Image
            src={"/assests/icons/site-logo.svg"}
            width={60}
            height={60}
            className="rounded-full"
            alt="profile image"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="text-xl font-poppins font-semibold capitalize">
            JS Mystery
          </h1>
          <p className="font-poppins text-sm">js@gmail.com</p>
          <div className="flex gap-4 items-center">
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
            <p className="font-noto_serif ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maxime
              consequuntur assumenda, ipsa fugit molestiae sit. Ipsam optio
              officia magnam unde, consequatur ab? Neque dolor veritatis eos
              animi, dignissimos voluptas debitis.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
