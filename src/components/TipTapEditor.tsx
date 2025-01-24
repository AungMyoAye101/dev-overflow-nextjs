"use client";

import { useEditor, EditorContent, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { FC, Fragment } from "react";
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
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";

export function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return <Fragment></Fragment>;
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
      action: () => {},
      isActive: () => editor.isActive("taskList"),
    },
    {
      icon: <PiCodeBlockLight />,
      title: "Code Block",
      action: () => editor.chain().focus().toggleCodeBlock().run(),
      isActive: () => editor.isActive("codeBlock"),
    },
    {
      icon: <FaQuoteRight />,
      title: "Blockquote",
      action: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: () => editor.isActive("blockquote"),
    },

    {
      icon: "F",
      title: "Clear Format",
      action: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
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
    <div className="flex gap-1 p-2 bg-secondary-white dark:bg-black-card">
      {items.map((item, index) => (
        <button
          type="button"
          key={index}
          onClick={item.action}
          title={item.title}
          className="w-9 h-11 text-lg flex justify-center items-center rounded-md bg-primary-white dark:bg-black-bg"
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
}

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TipTapEditor: FC<TipTapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      // CodeBlockLowlight.configure({
      //   lowlight: require("lowlight"),
      // }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      Code,
      CodeBlock,
      Bold,
      Italic,
      Underline,
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: "p-4 focus:outline-none min-h-[200px] ",
      },
    },

    content: content ? content : "<h1>Type your question</h1>",
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });
  return (
    <div className="border-2  border-secondary-white dark:border-black-card rounded-lg overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TipTapEditor;
