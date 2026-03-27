"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/src/hooks/use-toast";
import { useSession } from "@/src/components/AuthProvider";
import { Button } from "@/src/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
});

type Mode = "sign-in" | "sign-up";
type AuthFormValues = {
  name?: string;
  email: string;
  password: string;
};

const AuthForm = ({ mode }: { mode: Mode }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const schema = mode === "sign-up" ? signUpSchema : signInSchema;
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(schema),
    defaultValues:
      mode === "sign-up"
        ? { name: "", email: "", password: "" }
        : { email: "", password: "" },
  });

  const onSubmit = async (values: AuthFormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setUser(data.user);
      toast({
        title: mode === "sign-up" ? "Account created" : "Signed in",
        description:
          mode === "sign-up"
            ? "Your account is ready to use."
            : "Welcome back to Dev Overflow.",
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      toast({
        title: mode === "sign-up" ? "Sign-up failed" : "Sign-in failed",
        description:
          error instanceof Error ? error.message : "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid w-full max-w-5xl overflow-hidden rounded-4xl border border-border/60 bg-card shadow-2xl shadow-primary/10 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-foreground lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.28),transparent_35%),linear-gradient(180deg,transparent,rgba(6,10,34,0.18))]" />
        <div className="relative space-y-6">
          <div>
            <p className="font-poppins text-sm font-semibold uppercase tracking-[0.3em] text-primary-foreground/70">
              DevOverflow
            </p>
            <h2 className="mt-4 font-poppins text-4xl font-extrabold tracking-tight">
              {mode === "sign-up"
                ? "Join the blue side of the conversation."
                : "Pick up the discussion where you left off."}
            </h2>
          </div>
          <p className="max-w-md font-noto_serif text-base leading-7 text-primary-foreground/80">
            {mode === "sign-up"
              ? "Create your account to ask sharp questions, publish thoughtful answers, and build your reputation with the community."
              : "Sign in to continue answering questions, save important threads, and manage your profile from one place."}
          </p>
        </div>
      </div>

      <div className="w-full p-6 sm:p-8 lg:p-10">
        <div className="mb-8 space-y-2">
          <h1 className="h2-bold">
            {mode === "sign-up" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {mode === "sign-up"
              ? "Use your name, email, and password to start posting."
              : "Sign in with your email and password."}
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            {mode === "sign-up" && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Jane Doe"
                        className="h-11 rounded-xl border-border/70 bg-background"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder="jane@example.com"
                      className="h-11 rounded-xl border-border/70 bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder="At least 8 characters"
                      className="h-11 rounded-xl border-border/70 bg-background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="button_bg mt-2 h-11 w-full rounded-xl"
            >
              {isSubmitting
                ? mode === "sign-up"
                  ? "Creating account..."
                  : "Signing in..."
                : mode === "sign-up"
                ? "Create account"
                : "Sign in"}
            </Button>
          </form>
        </Form>

        <p className="mt-6 text-center text-sm opacity-80">
          {mode === "sign-up"
            ? "Already have an account? "
            : "Need an account? "}
          <Link
            href={mode === "sign-up" ? "/sign-in" : "/sign-up"}
            className="font-semibold text-primary"
          >
            {mode === "sign-up" ? "Sign in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
