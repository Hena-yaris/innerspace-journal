"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  List,
  Quote,
  Undo,
  Redo,
  Minus,
  ListOrdered,
  AlignCenter,
  AlignLeft,
  AlignRight,
} from "lucide-react";

const MenuBar = ({ editor }: any) => {
  if (!editor) return null;

  const btnClass = (isActive: boolean = false) => `
    p-2.5 rounded-xl transition-all duration-300
    ${
      isActive
        ? "bg-sanctuary-700 text-white shadow-md shadow-sanctuary-200 scale-105"
        : "text-sanctuary-300 hover:bg-sanctuary-50 hover:text-sanctuary-600"
    }
  `;

  return (
    <div className="sticky top-0 z-30 flex flex-wrap items-center gap-1 p-2 mb-8 bg-white/60 backdrop-blur-md border border-sanctuary-100/50 rounded-2xl shadow-sm">
      {/* Undo/Redo */}
      <div className="flex items-center gap-0.5 px-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          className={btnClass()}
        >
          <Undo size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          className={btnClass()}
        >
          <Redo size={16} />
        </button>
      </div>

      <div className="w-px h-6 bg-sanctuary-100/60 mx-1" />

      {/* Style: H1, H2, Bold, Italic */}
      <div className="flex items-center gap-0.5 px-2">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 1 }))}
        >
          <span className="font-serif font-bold text-xs italic">H1</span>
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={btnClass(editor.isActive("heading", { level: 2 }))}
        >
          <span className="font-serif font-bold text-xs italic">H2</span>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={btnClass(editor.isActive("bold"))}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={btnClass(editor.isActive("italic"))}
        >
          <Italic size={16} />
        </button>
      </div>

      <div className="w-px h-6 bg-sanctuary-100/60 mx-1" />

      {/*  Lists, Quote, HR */}
      <div className="flex items-center gap-0.5 px-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={btnClass(editor.isActive("bulletList"))}
        >
          <List size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={btnClass(editor.isActive("blockquote"))}
        >
          <Quote size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={btnClass()}
        >
          <Minus size={16} />
        </button>
      </div>

      <div className="w-px h-6 bg-sanctuary-100/60 mx-1" />

      {/* Alignment */}
      <div className="flex items-center gap-0.5 px-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={btnClass(editor.isActive({ textAlign: "left" }))}
        >
          <AlignLeft size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={btnClass(editor.isActive({ textAlign: "center" }))}
        >
          <AlignCenter size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={btnClass(editor.isActive({ textAlign: "right" }))}
        >
          <AlignRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default function TiptapEditor({
  onChange,
  initialContent,
}: {
  onChange: (json: any) => void;
  initialContent?: any; //Optional prop
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder: "In a quiet moment of reflection...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: initialContent || "", //if we have data, we use it!
    editorProps: {
      attributes: {
        class:
          "focus:outline-none min-h-[450px] ProseMirror readonly-content prose-none max-w-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
    immediatelyRender: false,
  });

  return (
    <div className="w-full bg-transparent">
      <MenuBar editor={editor} />
      <div className="relative cursor-text ">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
