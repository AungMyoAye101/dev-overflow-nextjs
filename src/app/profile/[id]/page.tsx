import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import { getUserById } from "@/src/lib/actions/user.action";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const user = await getUserById(id);
  return (
    <section className="page_padding">
      <Profile user={user} />
      <Stats />
      {/* <UserPost /> */}
    </section>
  );
};

export default page;
