"use client";
import { Input } from "@/src/components/ui/input";
import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { useForm } from "react-hook-form";
import { editProfileSchema } from "@/src/lib/FormViladitaion";
import { Textarea } from "@/src/components/ui/textarea";
import { Button } from "@/src/components/ui/button";
import { updateUser } from "@/src/lib/actions/user.action";
import { ClerkIdProp, UserProps } from "../type";
import { usePathname, useRouter } from "next/navigation";

interface ProfileProps {
  user: UserProps;
}

const ProfileEdit: FC<ProfileProps> = ({ user }) => {
  const [edit, setEdit] = useState(false);
  const router = useRouter();
  const path = usePathname();
  //@ts-nocheck
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user.name || "",
      username: user.username || "",
      email: user.email || "",
      portfolio: user.portfolio || "",
      bio: user.bio || "",
      location: user.location || "",
    },
  });

  async function onSubmit(values: z.infer<typeof editProfileSchema>) {
    //add logic
    const { clerkId } = user;
    const updateData = values;
    try {
      await updateUser({ clerkId, updateData, path });
      setEdit(true);
      router.push(`/profile/${clerkId}`);
    } catch (error) {
      console.log(error);
    } finally {
      setEdit(false);
    }
  }

  return (
    <section className="page_padding">
      <h1 className="h2-bold">Edit Profile</h1>
      <main>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="portfolio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Portfolio Link</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="you@gmail.com" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Mandalay" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="bio" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={edit}
              className="btn-bg self-end px-6"
            >
              {edit ? "Editing" : "Edit"}
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default ProfileEdit;
