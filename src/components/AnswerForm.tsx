"use client";

import React, { useRef, useState } from "react";
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
import { createAnswer } from "../lib/actions/answer.action";
import { usePathname } from "next/navigation";
import { useToast } from "../hooks/use-toast";
import { useAuth } from "@clerk/nextjs";
import { Editor } from "@tinymce/tinymce-react";

interface Props {
  questionId: string;
}

const AnswerForm = ({ questionId }: Props) => {
  const [isSubmiting, setSubmiting] = useState(false);
  const editorRef = useRef(null);
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
                  <Editor
                    apiKey="7o3fzwo8vlsxhmogqdzf3vbqxgetr2t663ockiwk8u09x89d"
                    onInit={(_evt, editor) => {
                      //@ts-expect-error editor error
                      editorRef.current = editor;
                    }}
                    initialValue={field.value}
                    onBlur={() =>
                      field.onChange(
                        //@ts-expect-error editor error
                        editorRef.current.getContent()
                      )
                    }
                    onChange={(content) => field.onChange(content)}
                    init={{
                      height: 250,
                      menubar: false,
                      codesample_global_prismjs: true,

                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                        "codesample",
                      ],
                      codesample_languages: [
                        { text: "HTML/XML", value: "markup" },
                        { text: "JavaScript", value: "javascript" },
                        { text: "CSS", value: "css" },
                        { text: "Python", value: "python" },
                      ],

                      toolbar:
                        "undo redo | blocks " +
                        " bold italic forecolor codesample  | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                    }}
                  />
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
