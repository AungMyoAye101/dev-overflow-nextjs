"use client";

import React from "react";
import { Button } from "@/src/components/ui/button";
import { answerSchema, formSchema } from "@/src/lib/FormViladitaion";
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
import { UserProps } from "../type";
import { createAnswer } from "../lib/actions/create.answer";
interface user {
  user: UserProps;
  questionId: string;
}

const Answer = ({ user, questionId }: user) => {
  const handleSubmit = async (formdata: FormData) => {
    const answer = formdata.get("answer");
    try {
      const res = await createAnswer({
        answer,
        userId: user._id,
        question: questionId,
      });
      return res;
    } catch (error) {
      console.log(error);
    }
  };

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
            src={user.picture!}
            width={40}
            height={40}
            alt="profile"
            className="w-8 h-8 rounded-full"
          />
          <h1 className="font-semibold font-poppins ">{user.name}</h1>
        </Link>
        <Votes />
      </div>

      {/* <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 "
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>What is your answer</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter your though" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="px-4 py-1.5 btn-bg self-end">
            Post Answer
          </Button>
        </form>
      </Form> */}

      <form action={handleSubmit} className="flex flex-col gap-6 ">
        <textarea name="answer" id="" placeholder="enter your answer" />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default Answer;
