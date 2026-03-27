"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/src/components/AuthProvider";
import { useToast } from "@/src/hooks/use-toast";
import { LogIn, LogInIcon, LogOut, User } from "lucide-react";

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
            ? "sideBar-links w-full border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15"
            : "side-links text-destructive hover:border-destructive/20 hover:bg-destructive/10 hover:text-destructive"
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
      <Link
        href="/sign-in"
        className={
          mobile
            ? "sideBar-links w-full text-primary"
            : "side-links"
        }
        onClick={onNavigate}
      >
        <LogIn />
        <span>Log in</span>
      </Link>
      <Link
        href="/sign-up"
        className={
          mobile
            ? "sideBar-links w-full bg-primary text-primary-foreground hover:bg-primary/90"
            : "side-links bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
        }
        onClick={onNavigate}
      >
        <User className="text-lg" />
        <span>Sign up</span>
      </Link>
    </>
  );
};

export default AuthActions;
