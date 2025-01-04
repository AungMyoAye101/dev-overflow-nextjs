import React from "react";
import { FaRegStar } from "react-icons/fa";
import { ImArrowDown, ImArrowUp } from "react-icons/im";

const Votes = () => {
  return (
    <section className="flex gap-4 items-center">
      <div className="flex items-center gap-1 ">
        <ImArrowUp className="text-lg" />

        <p className="bg-gray-200 text-black text-xs px-1 py-1 rounded ">12</p>
      </div>
      <div className="flex items-center gap-1 ">
        <ImArrowDown className="text-lg" />
        <p className="bg-gray-200 text-black text-xs px-1 py-1 rounded ">12</p>
      </div>
      <div>
        <FaRegStar className="text-lg" />
      </div>
    </section>
  );
};

export default Votes;
