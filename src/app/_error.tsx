"use client";
import React from "react";
import Link from "next/link";

const CustomErrorPage = ({ statusCode }: { statusCode?: number }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-6xl font-bold text-red-600">{statusCode || 500}</h1>
      <h2 className="mt-4 text-2xl font-semibold">
        {statusCode
          ? `Oops! Something went wrong.`
          : "An unexpected error occurred."}
      </h2>
      <p className="mt-2 text-gray-600">
        {statusCode === 404
          ? "The page you're looking for doesn't exist."
          : "We are working on fixing this issue. Please try again later."}
      </p>
      <Link
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        Back to Homepage
      </Link>
    </div>
  );
};

// You can customize the error status code here
CustomErrorPage.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomErrorPage;
