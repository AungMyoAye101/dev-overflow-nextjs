import Image from "next/image";
import React from "react";

const Stats = () => {
  return (
    <section className="space-y-4">
      <h1 className="h2-bold">Stats</h1>
      <div className="flex  gap-4">
        <div className="text-sm bg_dark_white shadow_rounded py-3 px-5 flex flex-col items-center justify-center  font-noto_serif font-semibold ">
          <div className="space-x-2 ">
            <span>100</span>
            <span>Questions</span>
          </div>
          <div className="space-x-2  ">
            <span>100</span>
            <span>Answers</span>
          </div>
        </div>

        <div className="bg_dark_white shadow_rounded py-3 px-5 flex items-center gap-4">
          <Image
            src={"/assets/icons/gold.svg"}
            width={40}
            height={40}
            alt="gold badge"
          />
          <div className="flex flex-col font-noto_serif font-semibold text-sm">
            <span>100</span>
            <span>Gold Bage</span>
          </div>
        </div>
        <div className="bg_dark_white shadow_rounded py-3 px-5 flex items-center gap-4">
          <Image
            src={"/assets/icons/silver.svg"}
            width={40}
            height={40}
            alt="silver badge"
          />
          <div className="flex flex-col font-noto_serif font-semibold text-sm">
            <span>100</span>
            <span>Silver Bage</span>
          </div>
        </div>
        <div className="bg_dark_white shadow_rounded py-3 px-5 flex items-center gap-4">
          <Image
            src={"/assets/icons/bronze.svg"}
            width={40}
            height={40}
            alt="bronze badge"
          />
          <div className="flex flex-col font-noto_serif font-semibold text-sm">
            <span>100</span>
            <span>Bronze Bage</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
