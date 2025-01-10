import Card from "@/src/components/Card";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import { getAllUsers } from "@/src/lib/actions/user.action";
import { SearchParamsProps } from "@/src/type";

import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  const allUsers = await getAllUsers({ searchQuery: query.q });
  if (!allUsers) return console.log("failed tp fetch all users");

  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Users</h1>
      <LocalSearchBox />

      {/* Grid container */}
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {allUsers.map((user) => (
          <Card user={user} key={user._id} />
        ))}
      </div>
    </section>
  );
};

export default Page;
