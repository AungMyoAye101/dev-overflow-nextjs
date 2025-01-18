"use client";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";
import { FaBold } from "react-icons/fa";

const Editor = () => {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: `
   Enter your text...
    `,
  });

  return (
    <div>
      <div className="flex items-center">
        <button className="p-2">
          <FaBold />
        </button>
        <button className="p-2">
          <FaBold />
        </button>
        <button className="p-2">
          <FaBold />
        </button>
        <button className="p-2">
          <FaBold />
        </button>
        <button className="p-2">
          <FaBold />
        </button>
        <button className="p-2">
          <FaBold />
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
