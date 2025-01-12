"use client";

import React, { useEffect, useState } from "react";
import { searchType } from "../constants";
import Link from "next/link";
import { FaCircleNotch, FaTag } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import GlobalFilter from "./GlobalFilter";

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResult] = useState([1, 2, 3, 4]);
  const query = useSearchParams();
  const global = query.get("global");
  const type = query.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        //fetch everything ...
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
  }, [global, type]);

  return (
    <section className="absolute top-14 left-0 w-full  py-6 secondary_bg rounded-lg">
      <GlobalFilter />
      <div className="flex flex-col gap-4 mt-6">
        <h2 className="text-lg font-poppins  px-4">Top Match</h2>
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center  justify-center gap-2 py-2">
              <FaCircleNotch className="text-4xl text-orange animate-spin" />
              <p className="para">Searching Please wait...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item}
                href={"/"}
                className="flex gap-4 items-start hover:button_bg px-4 py-1.5 rounded-md"
              >
                <FaTag className="text-2xl" />
                <div className="flex flex-col text-sm font-noto_serif">
                  <p className="line-clamp-1  ">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Aliquam perspiciatis non esse voluptas? Odio, facere. Ab
                    cum, repudiandae
                  </p>
                  <span className="opacity-80">User</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center para font-medium">
              Opps , no results found!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResult;
