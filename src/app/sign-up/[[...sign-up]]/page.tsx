import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center page_padding">
      <SignUp />
    </div>
  );
};

export default page;
