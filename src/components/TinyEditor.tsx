"use client";
import React, { FC, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "./Theme";

interface EditorProps {
  value: string;
  onChange: (content: any) => void;
}

const TinyEditor: FC<EditorProps> = ({ value, onChange }) => {
  const editorRef = useRef(null);
  const { mode } = useTheme();
  return (
    <Editor
      apiKey="7o3fzwo8vlsxhmogqdzf3vbqxgetr2t663ockiwk8u09x89d"
      onInit={(_evt, editor) => {
        //@ts-expect-error  editor error
        editorRef.current = editor;
      }}
      initialValue={value}
      onBlur={() =>
        onChange(
          //@ts-expect-error editor error
          editorRef.current.getContent()
        )
      }
      onChange={(content) => onChange(content)}
      init={{
        height: 300,
        menubar: false,
        codesample_global_prismjs: true,

        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "help",
          "wordcount",
          "codesample",
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
  );
};

export default TinyEditor;
