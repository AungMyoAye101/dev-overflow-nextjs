import Card from "@/src/components/Card";
import Filter from "@/src/components/Filter";
import LocalSearchBox from "@/src/components/LocalSearchBox";
import PaginationBox from "@/src/components/PaginationBox";
import { sortUsers } from "@/src/constants";
import { getAllUsers } from "@/src/lib/actions/user.action";
import { SearchParamsProps } from "@/src/type";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const query = await searchParams;
  const allUsers = await getAllUsers({
    searchQuery: query.q || "",
    sortQuery: query.filter || "",
    page: query.page ? +query.page : 1,
  });
  if (!allUsers) return console.log("failed tp fetch all users");

  return (
    <section className="page_padding">
      <h1 className="h1-bold">All Users</h1>
      <div className="flex flex-row lg:flex-col gap-4">
        <LocalSearchBox />
        <Filter filterArray={sortUsers} />
      </div>

      {/* Grid container */}
      <div className="grid sm:grid-cols-2  lg:grid-cols-3 gap-4 place-items-center">
        {allUsers.users.map((user) => (
          <Card user={user} key={user._id} />
        ))}
      </div>
      <PaginationBox
        pageNumber={query?.page ? +query.page : 1}
        isNext={allUsers.isNext}
      />
    </section>
  );
};

export default Page;
