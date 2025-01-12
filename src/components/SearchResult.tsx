import React from "react";
import { searchType } from "../constants";
import Link from "next/link";
import { FaTag } from "react-icons/fa";

const SearchResult = () => {
  return (
    <section className="absolute top-14 left-0 w-full  py-6 secondary_bg rounded-lg">
      <div className="flex gap-4 items-center font-poppins px-4">
        <p className="font-medium ">Type</p>
        {searchType.map((t) => (
          <button
            key={t}
            className="px-3 py-1 rounded-full button_bg shadow text-sm"
          >
            {t}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="text-lg font-poppins font-medium px-4">Top Match</h2>
        <div className="flex flex-col gap-4">
          <Link
            href={"/"}
            className="flex gap-4 items-center hover:button_bg px-4 py-1.5 rounded-md"
          >
            <FaTag className="text-2xl" />
            <div className="flex flex-col text-sm font-noto_serif">
              <p className="line-clamp-1  ">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Aliquam perspiciatis non esse voluptas? Odio, facere. Ab cum,
                repudiandae
              </p>
              <span className="opacity-80">User</span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
