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
import { Textarea } from "./ui/textarea";
import { RxCrossCircled } from "react-icons/rx";
import { Badge } from "./ui/badge";
import { askQuestion } from "@/src/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { QuestionProps } from "../type";

interface QuestionEdit {
  formType: string;
  question?: QuestionProps | undefined;
}

export const QuestionForm = ({ formType, question }: QuestionEdit) => {
  const [isSubmiting, setSubmiting] = useState(false);

  const path = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: question?.title || "",
      content: question?.content || "",
      tags: [],
    },
  });

  console.log(question);
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
                <Input placeholder="Title" {...field} />
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
                <Textarea
                  placeholder="Content"
                  {...field}
                  className="min-h-40"
                />
                {/* <Editor
                  ref={editorRef}
                  apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                  onInit={(_evt, editor) => {
                    //@ts ignore
                    editorRef.current = editor;
                  }}
                  initialValue=""
                  init={{
                    height: 350,
                    menubar: false,
                    skin: mode === "dark" ? "oxide-dark" : "oxide",
                    content_css: mode === "dark" ? "dark" : "default",
                    plugins: [
                      "advlist",
                      "autolink",
                      "lists",
                      "link",
                      "image",
                      "preview",
                      "anchor",
                      "searchreplace",
                      "visualblocks",
                      "codesample",
                      "table",
                      "help",
                      "wordcount",
                    ],
                    toolbar:
                      "undo redo | blocks | " +
                      "codesample  | bold italic forecolor  | alignleft aligncenter " +
                      "alignright alignjustify | bullist numlist outdent indent | " +
                      "removeformat | help",
                    content_style:
                      "body { font-family:poppins; font-size:14px; }",
                  }}
                  onBlur={field.onBlur}
                  onEditorChange={(content) => {
                    field.onChange(content);
                  }}
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
                    // {...field}
                    disabled={formType === "Edit"}
                    onKeyDown={(e) => handleOnKeyDown(e, field)}
                  />
                  {field.value.length > 0 && (
                    <div className="flex items-center gap-4">
                      {field.value.map((tag, index) => (
                        <Badge
                          key={index}
                          className="flex items-center gap-2 px-4 py-2  font-poppins"
                        >
                          <span className="capitalize">{tag}</span>
                          <button
                            className="text-lg hover:text-orange"
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
          className="self-end btn-bg"
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
