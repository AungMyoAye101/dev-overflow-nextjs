"use client";

import LocalSearchBox from "@/components/LocalSearchBox";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight, FaClock, FaDollarSign } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Job = () => {
  return (
    <section className="page_padding">
      <h1 className="h1-bold">Jobs</h1>
      <LocalSearchBox />
      <div className="flex flex-col gap-6 ">
        {Array(10)
          .fill(null)
          .map((t, i) => (
            <div
              key={i}
              className="flex justify-between gap-4 bg_dark_white shadow_rounded px-4 py-6"
            >
              <div className="flex gap-4">
                <div>
                  <Image
                    src={"/assets/icons/gold.svg"}
                    width={80}
                    height={80}
                    alt="job profile phote "
                    className="rounded-full size-32"
                  />
                </div>
                <div className="flex flex-col gap-2 max-w-[60%] ">
                  <div className="flex items-center gap-2">
                    <h1 className="h2-bold">AnyCall</h1>
                    <Badge className="px-6 py-1.5 font-poppins">Sell</Badge>
                  </div>
                  <p className="para opacity-00 line-clamp-4">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Reprehenderit, sint adipisci. Porro qui inventore ab
                    molestiae rerum, iste iure dolorem quibusdam aut obcaecati
                    quam blanditiis suscipit cum exercitationem molestias saepe!
                  </p>
                  <div className="flex gap-4 items-center text-sm font-noto_serif opacity-60">
                    <div className="flex gap-2 items-center">
                      <FaClock />
                      <span>Full times</span>
                    </div>
                    <div className="flex gap-2 items-center">
                      <FaDollarSign />
                      <span>10K-90K</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-end">
                <Link
                  href={"/"}
                  className="flex items-center gap-1 text-nowrap text-orange text-sm font-noto_serif"
                >
                  view Job
                  <FaArrowRight className="-rotate-45" />
                </Link>
              </div>
            </div>
          ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default Job;
