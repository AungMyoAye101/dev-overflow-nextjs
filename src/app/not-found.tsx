import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <section className="page_padding flex justify-center items-center ">
      <div className="flex flex-col items-center gap-4 w-[90%] sm:w-[60%]  mx-auto text-center">
        <h2 className="text-2xl font-poppins font-semibold">
          Opps:Something went worng!
        </h2>
        <p className="font-noto_serif">You try to search page is not found.</p>
        <Link
          href={"/"}
          className="btn-bg font-poppins font-semibold py-2 px-4 rounded-md capitalize"
        >
          Go back to home page
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
