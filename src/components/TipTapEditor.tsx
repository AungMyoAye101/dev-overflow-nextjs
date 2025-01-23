"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Fragment } from "react";
import { FaRedo, FaUndo } from "react-icons/fa";
import {
  FaBold,
  FaCode,
  FaItalic,
  FaList,
  FaListCheck,
  FaListOl,
  FaQuoteRight,
} from "react-icons/fa6";
import { PiCodeBlockLight } from "react-icons/pi";

export function MenuBar({ editor }: { editor: Editor }) {
  const items = [
    {
      icon: <FaBold />,
      title: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: () => editor.isActive("bold"),
    },
    {
      icon: <FaItalic />,
      title: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: () => editor.isActive("italic"),
    },

    {
      icon: <FaCode />,
      title: "Code",
      action: () => editor.chain().focus().toggleCode().run(),
      isActive: () => editor.isActive("code"),
    },

    {
      type: "divider",
    },
    {
      icon: "H1",
      title: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: () => editor.isActive("heading", { level: 1 }),
    },
    {
      icon: "H2",
      title: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: () => editor.isActive("heading", { level: 2 }),
    },
    {
      icon: "P",
      title: "Paragraph",
      action: () => editor.chain().focus().setParagraph().run(),
      isActive: () => editor.isActive("paragraph"),
    },
    {
      icon: <FaList />,
      title: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: () => editor.isActive("bulletList"),
    },
    {
      icon: <FaListOl />,
      title: "Ordered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: () => editor.isActive("orderedList"),
    },
    {
      icon: <FaListCheck />,
      title: "Task List",
      action: () => editor.chain().focus().toggleList().run(),
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: <PiCodeBlockLight />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      type: "divider",
    },
    {
      icon: <FaQuoteRight />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },

    {
      type: "divider",
    },
    {
      icon: "T",
      title: "Hard Break",
      action: () => editor.chain().focus().setHardBreak().run(),
    },
    {
      icon: "F",
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    {
      icon: <FaUndo />,
      title: "Undo",
      action: () => editor.chain().focus().undo().run(),
    },
    {
      icon: <FaRedo />,
      title: "Redo",
      action: () => editor.chain().focus().redo().run(),
    },
  ];

  return (
    <div className="editor__header">
      {items.map((item, index) => (
        <Fragment key={index}>
          {item.type === "divider" ? (
            <div className="divider" />
          ) : (
            <button
              onClick={item.action}
              title={item.title}
              className="w-8 h-10 flex justify-center items-center rounded-md bg-primary-white dark:bg-black-bg"
            >
              {item.icon}
            </button>
          )}
        </Fragment>
      ))}
    </div>
  );
}

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Hello World! 🌎️</p>",
  });
  return (
    <div className="border-2 border-white dark:border-black-card rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
