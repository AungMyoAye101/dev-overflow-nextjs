"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCircleNotch } from "react-icons/fa";
import { PiTagThin } from "react-icons/pi";
import { useSearchParams } from "next/navigation";
import GlobalFilter from "./GlobalFilter";
import { globalSearch } from "../lib/actions/general.actions";

const SearchResult = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResult] = useState<any[]>([]);
  const query = useSearchParams();
  const global = query.get("global");
  const type = query.get("type");

  useEffect(() => {
    const fetchResult = async () => {
      setResult([]);
      setIsLoading(true);
      try {
        //fetch everything ...
        const res = await globalSearch({ global, type });
        setResult(JSON.parse(res));
      } catch (error) {
        throw error;
      } finally {
        setIsLoading(false);
      }
    };
    if (global) {
      fetchResult();
    }
  }, [global, type]);

  const handleNavigate = (type: string, id: string) => {
    switch (type) {
      case "questions":
        return `/question/${id}`;

      case "answers":
        return `/question/${id}`;

      case "tags":
        return `/tags/${id}`;
      case "users":
        return `/profile/${id}`;

      default:
        return "/";
    }
  };
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
            results.map((item, i) => (
              <Link
                key={i}
                href={handleNavigate(item.type, item.id)}
                className="flex gap-4 items-start hover:button_bg px-4 py-1.5 rounded-md"
              >
                <PiTagThin className="text-2xl mt-1" />
                <div className="flex flex-col text-sm font-noto_serif">
                  <p className="line-clamp-1  ">{item.title}</p>
                  <span className="opacity-80">{item.type}</span>
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
