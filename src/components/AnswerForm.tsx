"use client";

import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { answerSchema } from "@/src/lib/FormViladitaion";
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

import { Textarea } from "./ui/textarea";
import { createAnswer } from "../lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
interface Props {
  questionId: string;
}

const AnswerForm = ({ questionId }: Props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const path = usePathname();
  const { userId } = useAuth();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof answerSchema>>({
    resolver: zodResolver(answerSchema),
    defaultValues: {
      content: "",
    },
  });

  // 2. Define a submit handler.
  async function submitHandler(values: z.infer<typeof answerSchema>) {
    setSubmiting(true);
    const { content } = values;
    try {
      await createAnswer({
        content,
        questionId,
        userId: userId as string,
        path: path as string,
      });
      toast({
        title: "You post an answer successfull",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      throw error;
    } finally {
      setSubmiting(false);
    }
  }

  return (
    <section className="flex flex-col gap-6 bg_dark_white px-6 py-6 rounded-lg shadow-md dark:shadow-none">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex flex-col gap-6 "
        >
          <FormField
            control={form.control}
            name="content"
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
          <Button
            type="submit"
            className="px-4 py-1.5 btn-bg self-end"
            disabled={isSubmiting}
          >
            {isSubmiting ? "Submitting" : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default AnswerForm;
