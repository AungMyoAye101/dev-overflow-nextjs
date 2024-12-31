import Card from "@/src/components/Card";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import { Badge } from "@/src/components/ui/badge";
import { getAllUsers } from "@/src/lib/actions/getUser";
import Image from "next/image";
import React from "react";

const Page = async () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const allUsers = await getAllUsers();
  if (!allUsers) return;

  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Users</h1>
      <LocalSearchBox />

      {/* Grid container */}
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {allUsers.length < 0 &&
          allUsers.map((user, i) => <Card user={user} key={i} />)}
      </div>
    </section>
  );
};

export default Page;
