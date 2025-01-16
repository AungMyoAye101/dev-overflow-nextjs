"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);
const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      // CodeBlockLowlight.configure({
      //   lowlight,
      // }),
    ],
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div>
      {/* <div className="control-group">
        <div className="button-group">
          <button
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive("codeBlock") ? "is-active" : ""}
          >
            Toggle code block
          </button>
          <button
            onClick={() => editor?.chain().focus().setCodeBlock().run()}
            disabled={editor?.isActive("codeBlock")}
          >
            Set code block
          </button>
        </div>
      </div> */}
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
