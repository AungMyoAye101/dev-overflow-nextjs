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
import { usePathname, useRouter } from "next/navigation";
import { useToast } from "../hooks/use-toast";

import QuillEditor from "./QuillEditor";
import { useSession } from "@/src/components/AuthProvider";

interface Props {
  questionId: string;
}

const AnswerForm = ({ questionId }: Props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useSession();
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
      if (!isAuthenticated) {
        router.push("/sign-in");
        return;
      }

      const response = await fetch("/api/answers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          questionId,
          path,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to post answer");
      }
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
                  <QuillEditor
                    content={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="px-4 py-1.5 button_bg self-end mt-6"
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
