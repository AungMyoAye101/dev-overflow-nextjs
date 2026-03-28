"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/components/AuthProvider";
import { useToast } from "@/src/hooks/use-toast";
import { LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/src/components/ui/button";

interface AuthActionsProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const AuthActions = ({ mobile = false, onNavigate }: AuthActionsProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, setUser } = useSession();

  const handleSignOut = async () => {
    await fetch("/api/auth/sign-out", { method: "POST" });
    setUser(null);
    toast({ title: "Signed out" });
    router.push("/sign-in");
    router.refresh();
    onNavigate?.();
  };

  if (user) {
    return (
      <button
        className={
          mobile
            ? "sidebar-link  w-full border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15"
            : "sidebar-link text-destructive hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
        }
        onClick={handleSignOut}
      >
        <LogOut />
        <span>{mobile ? "LogOut" : "Log out"}</span>
      </button>
    );
  }

  return (
    <>
      <Button
        variant={'outline'}
        size={'lg'}
        asChild
      >


        <Link
          href="/sign-in"
          className=' flex justify-start gap-2 text-lg'
          onClick={onNavigate}
        >
          <LogIn />
          <span>Log in</span>
        </Link>
      </Button>
      <Button
        size={'lg'}
        asChild
      >
        <Link
          href="/sign-up"
          className='flex justify-start'
          onClick={onNavigate}
        >
          <User className="text-lg" />
          <span>Sign up</span>
        </Link>
      </Button>
    </>
  );
};

export default AuthActions;
