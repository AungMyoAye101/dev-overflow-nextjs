"use client";
import { Input } from "@/src/components/ui/input";
import React from "react";
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

const ProfileEdit = () => {
  //@ts-nocheck
  const form = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      username: "",
      portfolio: "",
      location: "",
      bio: "",
    },
  });

  function onSubmit(values: z.infer<typeof editProfileSchema>) {
    //add logic
    console.log(values);
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User Name</FormLabel>
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
                    <Input type="email" placeholder="you@gmai.com" {...field} />
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
            <Button type="submit" className="btn-bg self-end px-6">
              Edit
            </Button>
          </form>
        </Form>
      </main>
    </section>
  );
};

export default ProfileEdit;
