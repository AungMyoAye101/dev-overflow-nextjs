"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
// Dynamically import React Quill to disable SSR
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
const QuillEditor = () => {
  const [content, setContent] = useState("");

  const handleChange = (value: string) => {
    setContent(value);
  };
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "code", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={content}
        onChange={handleChange}
        placeholder="Start typing..."
        style={{ height: "300px" }}
      />
    </div>
  );
};

export default QuillEditor;
