"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  description: z.string().min(12, {
    message: "Description must be at least 12 characters",
  }),
  tags: z.string().min(3, {
    message: "tags must be at least 12 characters",
  }),
});

export function Question() {
  const { mode } = useTheme();

  const editorRef = useRef<any>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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
                <Textarea placeholder="shadcn" {...field} />
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

                {/* <Input placeholder="shadcn" {...field} /> */}
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
                <Input placeholder="tags" {...field} />
              </FormControl>
              <FormDescription>
                Add up to 5 tags to describe what your question is about. Start
                typing to see suggestions
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
