"use client";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/lib/FormViladitaion";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { useTheme } from "./Theme";

import { RxCrossCircled } from "react-icons/rx";
import { Badge } from "./ui/badge";

export function Question() {
  const { mode } = useTheme();
  const [submit, setSubmit] = useState(false);

  const formType = "edit";

  const editorRef = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setSubmit(true);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
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
      if (tagValue.length > 8) {
        console.log("here");
        return form.setError("tags", {
          type: "required",
          message: "Tags must be lower than 8",
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qusetion Title</FormLabel>
              <FormControl>
                <Textarea placeholder="Title" {...field} />
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detailed explanation of your problem? *</FormLabel>
              <FormControl>
                <Editor
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
                />
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
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submit} className="w-full">
          {formType === "edit"
            ? submit
              ? "Editing..."
              : "Edit"
            : submit
            ? "Posting..."
            : "Ask a question"}
        </Button>
      </form>
    </Form>
  );
}
