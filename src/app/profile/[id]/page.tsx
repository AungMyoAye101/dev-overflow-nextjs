import Profile from "@/src/components/Profile";
import Stats from "@/src/components/Stats";
import { getUserById } from "@/src/lib/actions/user.action";

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const user = await getUserById(id);
  if (!user) {
    return console.log("user not find");
  }
  return (
    <section className="page_padding">
      <Profile user={user} />
      <Stats />
      {/* <UserPost /> */}
    </section>
  );
};

export default page;
