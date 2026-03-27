import AuthForm from "@/src/components/AuthForm";

const page = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center py-8">
      <AuthForm mode="sign-in" />
    </div>
  );
};

export default page;
