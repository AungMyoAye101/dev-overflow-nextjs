"use client";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { FaBold } from "react-icons/fa";

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  const buttons = [
    {
      name: "bold",
      icon: "b",
      onClick: () => editor.chain().focus().toggleBold().run(),
      disabled: !editor.can().chain().focus().toggleBold().run(),
      className: editor.isActive("bold") ? "is-active" : "",
    },
    {
      name: "Italic",
      icon: "italic",
      onClick: () => editor.chain().focus().toggleItalic().run(),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
      className: editor.isActive("italic") ? "is-active" : "",
    },
    {
      name: "strike",
      icon: "strike",
      onClick: () => editor.chain().focus().toggleStrike().run(),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
      className: editor.isActive("strike") ? "is-active" : "",
    },
    {
      name: "code",
      icon: "code",
      onClick: () => editor.chain().focus().toggleCode().run(),
      disabled: !editor.can().chain().focus().toggleCode().run(),
      className: editor.isActive("code") ? "is-active" : "",
    },
    {
      name: "para",
      icon: "para",
      onClick: () => editor.chain().focus().setParagraph().run(),
      disabled: false,
      className: editor.isActive("paragraph") ? "is-active" : "",
    },
    {
      name: "H1",
      icon: "h1",
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 1 }) ? "is-active" : "",
    },
    {
      name: "H2",
      icon: "h2",
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 2 }) ? "is-active" : "",
    },
    {
      name: "H3",
      icon: "h3",
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      disabled: false,
      className: editor.isActive("heading", { level: 3 }) ? "is-active" : "",
    },
    {
      name: "    Bullet list",
      icon: "    Bullet list",
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      disabled: false,
      className: editor.isActive("bulletList") ? "is-active" : "",
    },
    {
      name: "Ordered list",
      icon: "Ordered list",
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      disabled: false,
      className: editor.isActive("orderedList") ? "is-active" : "",
    },
    {
      name: "Code block",
      icon: "Code block",
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      disabled: false,
      className: editor.isActive("codeBlock") ? "is-active" : "",
    },
    {
      name: "undo",
      icon: "undo",
      onClick: () => editor.chain().focus().undo().run(),
      disabled: !editor.can().chain().focus().undo().run(),
      className: "",
    },
    {
      name: "redo",
      icon: "redo",
      onClick: () => editor.chain().focus().redo().run(),
      disabled: !editor.can().chain().focus().redo().run(),
      className: "",
    },
  ];

  return (
    <div className="">
      {buttons.map((btn) => (
        <button
          key={btn.name}
          onClick={btn.onClick}
          disabled={btn.disabled}
          className={btn.className}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class: "min-h-60 focus:outline-none",
      },
    },
    content: `
   Enter your text...
    `,
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Editor;
