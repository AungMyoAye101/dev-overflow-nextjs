"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
// Dynamically import React Quill to disable SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface QuillEditorProps {
  content: string;
  onChange: (value: string) => void;
}
const QuillEditor: FC<QuillEditorProps> = ({ content, onChange }) => {
  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    ["blockquote", "code-block"],
    ["link"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  return (
    <ReactQuill
      theme="snow"
      modules={{ toolbar: toolbarOptions }}
      value={content}
      onChange={onChange}
      placeholder="Start typing..."
      style={{ height: "300px" }}
    />
  );
};

export default QuillEditor;
