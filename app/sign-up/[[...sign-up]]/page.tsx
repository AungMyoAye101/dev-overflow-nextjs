import { SignUp } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
};

export default page;
