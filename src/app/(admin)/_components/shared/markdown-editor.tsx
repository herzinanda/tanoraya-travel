"use client";

import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "../../_lib/cn";

interface MarkdownEditorProps {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
}

const TOOLBAR = [
  { label: "B", title: "Bold", before: "**", after: "**", className: "font-bold" },
  { label: "I", title: "Italic", before: "_", after: "_", className: "italic" },
  { label: "H2", title: "Heading 2", before: "\n## ", after: "" },
  { label: "H3", title: "Heading 3", before: "\n### ", after: "" },
  { label: "`", title: "Inline code", before: "`", after: "`" },
  { label: "[ ]", title: "Link", before: "[", after: "](url)" },
  { label: "•", title: "Unordered list", before: "\n- ", after: "" },
  { label: "1.", title: "Ordered list", before: "\n1. ", after: "" },
  { label: '" "', title: "Blockquote", before: "\n> ", after: "" },
];

export function MarkdownEditor({
  name,
  defaultValue = "",
  placeholder,
  rows = 16,
}: MarkdownEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const [tab, setTab] = useState<"write" | "preview">("write");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const format = (before: string, after = "") => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = value.slice(s, e);
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    setValue(next);
    requestAnimationFrame(() => {
      ta.selectionStart = s + before.length;
      ta.selectionEnd = s + before.length + selected.length;
      ta.focus();
    });
  };

  return (
    <div className="border border-input rounded-md overflow-hidden">
      <input type="hidden" name={name} value={value} />

      <div className="flex items-center justify-between border-b border-input bg-muted/40 px-2 flex-wrap gap-1 py-1">
        <div className="flex">
          {(["write", "preview"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "px-3 py-1 text-xs font-medium capitalize transition-colors border-b-2",
                tab === t
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "write" && (
          <div className="flex items-center gap-0.5 flex-wrap">
            {TOOLBAR.map(({ label, title, before, after, className }) => (
              <button
                key={label}
                type="button"
                title={title}
                onClick={() => format(before, after)}
                className={cn(
                  "px-2 py-0.5 text-xs rounded font-mono text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
                  className
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {tab === "write" ? (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 text-sm font-mono resize-y focus:outline-none bg-background leading-relaxed"
        />
      ) : (
        <div className="p-4 overflow-auto bg-background" style={{ minHeight: `${rows * 1.5}rem` }}>
          {value ? (
            <ReactMarkdown
              components={{
                h1: ({ children }) => <h1 className="text-2xl font-bold mt-4 mb-2 border-b pb-1">{children}</h1>,
                h2: ({ children }) => <h2 className="text-xl font-bold mt-4 mb-2">{children}</h2>,
                h3: ({ children }) => <h3 className="text-lg font-semibold mt-3 mb-1">{children}</h3>,
                h4: ({ children }) => <h4 className="text-base font-semibold mt-2 mb-1">{children}</h4>,
                p: ({ children }) => <p className="mb-3 leading-relaxed text-sm">{children}</p>,
                strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                em: ({ children }) => <em className="italic">{children}</em>,
                code: ({ children, className }) =>
                  className ? (
                    <code className="block bg-muted p-3 rounded text-xs font-mono mb-3 overflow-x-auto">{children}</code>
                  ) : (
                    <code className="bg-muted px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                  ),
                pre: ({ children }) => <pre className="bg-muted rounded mb-3 overflow-x-auto">{children}</pre>,
                ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1 text-sm">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1 text-sm">{children}</ol>,
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                a: ({ href, children }) => (
                  <a href={href} className="text-primary underline hover:opacity-80" target="_blank" rel="noreferrer">
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground mb-3 text-sm">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-4 border-border" />,
              }}
            >
              {value}
            </ReactMarkdown>
          ) : (
            <p className="text-muted-foreground italic text-sm">Nothing to preview</p>
          )}
        </div>
      )}
    </div>
  );
}
