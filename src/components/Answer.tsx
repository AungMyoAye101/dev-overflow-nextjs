"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { formSchema } from "@/src/lib/FormViladitaion";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { filteredSearch } from "../constants";
import Image from "next/image";
import Link from "next/link";
import Votes from "./Votes";
import { Textarea } from "./ui/textarea";

const Answer = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <section className="flex flex-col gap-6 bg_dark_white px-6 py-6 rounded-lg shadow-md dark:shadow-none">
      <div className="flex justify-between items-center">
        <h2 className="h3-bold text-orange">128 Answers</h2>
        <Select>
          <SelectTrigger className="font-poppins font-semibold w-fit px-4 py-2 ">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            {filteredSearch.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* User profile and votes */}
      <div className="flex justify-between items-center ">
        <Link href={`/profile`} className="flex items-center gap-2">
          <Image
            src={"/assets/icons/site-logo.png"}
            width={40}
            height={40}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="font-semibold font-poppins ">
            {/* {questionDetail.author.name} */} happy
          </h1>
        </Link>
        <Votes />
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your answer</FormLabel>
                <FormControl>
                  <Textarea placeholder="Title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button>Post Answer</Button>
        </form>
      </Form>
    </section>
  );
};

export default Answer;
