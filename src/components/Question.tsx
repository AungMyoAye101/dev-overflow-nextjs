"use client";

import { useState } from "react";
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
import { RxCrossCircled } from "react-icons/rx";
import { Badge } from "./ui/badge";
import { askQuestion } from "@/src/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { QuestionProps } from "../type";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import TinyEditor from "./TinyEditor";
import TipTapEditor from "./TipTapEditor";

interface QuestionEdit {
  formType: string;
  question?: QuestionProps | undefined;
}

export const QuestionForm = ({ formType, question }: QuestionEdit) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const path = usePathname();
  const router = useRouter();
  const { userId } = useAuth();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, content, tags } = values;

    setSubmiting(true);
    try {
      await askQuestion({
        title,
        content,
        tags,
        path,
        userId: userId as string,
      });
      toast({
        title: `You ${
          formType.toLocaleLowerCase() === "edit" ? "edited" : "post"
        } a question successfull`,
        variant: "default",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setSubmiting(false);
      router.push("/");
    }
  }

  const handleOnKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    field: any
  ) => {
    if (e.key === "Enter" && field.name === "tags") {
      e.preventDefault();
      const tag = e.target as HTMLInputElement;
      const tagValue = tag.value.trim();
      if (tagValue === "") return;

      if (form.getValues("tags").length > 2) {
        return form.setError("tags", {
          type: "required",
          message: "Tags must be lower than 3",
        });
      }
      if (tagValue.length > 12) {
        return form.setError("tags", {
          type: "required",
          message: "Tags must be lower than 12",
        });
      }

      if (!field.value.includes(tagValue as never)) {
        form.setValue("tags", [...field.value, tagValue]);
        tag.value = "";
        form.clearErrors("tags");
      } else {
        form.trigger();
      }
    }
  };

  return (
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
              <FormLabel>Qusetion Title</FormLabel>
              <FormControl>
                <Input
                  className="border-none focus:outline-none focus:ring-0 focus-visible:ring-0 bg-primary-white dark:bg-black-card py-1"
                  placeholder="Title"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Be specific and imagine you’re asking a question to another
                person.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed explanation of your problem? *</FormLabel>
              <FormControl>
                <TipTapEditor />
                {/* <TinyEditor
                  value={field.value}
                  onChange={(content) => field.onChange(content)}
                /> */}
              </FormControl>
              <FormDescription>
                Introduce the problem and expand on what you put in the title.
                Minimum 20 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4 ">
                  <Input
                    placeholder="tags"
                    className="border-none focus:outline-none focus:ring-0 focus-visible:ring-0 bg-primary-white dark:bg-black-card py-1"
                    disabled={formType === "Edit"}
                    onKeyDown={(e) => handleOnKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex items-center gap-4">
                      {field.value.map((tag, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 px-3 py-1.5  font-poppins hover:bg-primary-blue hover:text-primary-white"
                        >
                          <span className="capitalize">{tag}</span>
                          <button
                            className="text-lg hover:text-rose-500"
                            onClick={() => {
                              form.setValue(
                                "tags",
                                field.value.filter((_, i) => i !== index)
                              );
                            }}
                          >
                            <RxCrossCircled />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                Add up to 3 tags to describe what your question is about.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isSubmiting}
          className="self-end button_bg hover:bg-primary-blue"
        >
          {formType === "create"
            ? isSubmiting
              ? "Creating"
              : "Create"
            : isSubmiting
            ? "Editing"
            : "Edit"}
        </Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
