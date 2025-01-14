import Image from "next/image";
import React, { FC } from "react";
import { StatsProps } from "../type";

interface StatsBadgeProps {
  imgUrl: string;
  value: number;
  name: string;
}

const StatsBadge: FC<StatsBadgeProps> = ({ imgUrl, value, name }) => {
  return (
    <div className="bg_dark_white shadow_rounded py-3 px-4 flex items-center gap-4">
      <Image src={imgUrl} width={40} height={40} alt={name} />
      <div className="flex flex-col font-noto_serif font-semibold ">
        <span className="text-base text-orange">{value}</span>
        <span className="text-xs">{name}</span>
      </div>
    </div>
  );
};

const Stats: FC<StatsProps> = ({ totalQuestion, totalAnswer, badges }) => {
  return (
    <section className="space-y-4">
      <h1 className="h2-bold">Stats</h1>
      <div className="flex  gap-4">
        <div className="text-sm  bg_dark_white shadow_rounded py-3 px-5 flex flex-col items-center justify-center  font-noto_serif font-bold ">
          <div className="space-x-1 ">
            <span className="text-orange">{totalQuestion}</span>
            <span>{totalQuestion > 1 ? "Questions" : "Question"}</span>
          </div>
          <div className="space-x-1  ">
            <span className="text-orange">{totalAnswer}</span>
            <span>{totalAnswer > 1 ? "Answers" : "Answer"}</span>
          </div>
        </div>

        <StatsBadge
          imgUrl="/assets/icons/gold.svg"
          value={badges.GOLD}
          name="Gold Badge"
        />

        <StatsBadge
          imgUrl="/assets/icons/silver.svg"
          value={badges.SLIVER}
          name="Silver Badge"
        />

        <StatsBadge
          imgUrl="/assets/icons/bronze.svg"
          value={badges.BRONZE}
          name="Bronze Badge"
        />
      </div>
    </section>
  );
};

export default Stats;
