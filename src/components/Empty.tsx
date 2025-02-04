import Link from "next/link";
import React, { FC } from "react";
import { EmptyProps } from "../type";

const Empty: FC<EmptyProps> = ({ title, desecription, link, btn }) => {
  return (
    <div className="flex flex-col items-center gap-2 w-[90%] sm:w-[60%]  mx-auto text-center">
      {/* <Image
        src="/assets/images/noquestion.svg"
        width={300}
        height={350}
        alt="no question photo"
      /> */}
      <h2 className="text-2xl font-poppins font-semibold">{title}</h2>
      <p className="para ">{desecription}</p>
      <Link
        href={link}
        className="button_bg font-poppins font-semibold py-2 px-4 rounded-md capitalize mt-4"
      >
        {btn}
      </Link>
    </div>
  );
};

export default Empty;
