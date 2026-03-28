"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    pre: [...(defaultSchema.attributes?.pre || []), ["className"]],
    code: [
      ...(defaultSchema.attributes?.code || []),
      ["className", /^language-/, "hljs"],
    ],
    span: [...(defaultSchema.attributes?.span || []), ["className"]],
  },
};

interface RenderTextProps {
  content: string;
  className?: string;
  maxHeightClassName?: string;
  seeMoreHref?: string;
  seeMoreLabel?: string;
}

const RenderText = ({
  content,
  className,
  maxHeightClassName,
  seeMoreHref,
  seeMoreLabel = "See more",
}: RenderTextProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!maxHeightClassName || !containerRef.current) return;

    const element = containerRef.current;
    const checkOverflow = () => {
      setIsOverflowing(element.scrollHeight > element.clientHeight);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(element);

    return () => observer.disconnect();
  }, [content, maxHeightClassName]);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className={cn(
          "prose prose-sm max-w-none dark:prose-invert",
          maxHeightClassName ? `${maxHeightClassName} overflow-hidden` : ""
        )}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[
            rehypeRaw,
            [rehypeSanitize, sanitizeSchema],
            rehypeHighlight,
          ]}
        >
          {content}
        </ReactMarkdown>
      </div>

      {isOverflowing && seeMoreHref ? (
        <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-2 bg-gradient-to-t from-background to-transparent px-2 pt-8 pb-2">
          <Button asChild size="sm" variant="outline">
            <Link href={seeMoreHref}>{seeMoreLabel}</Link>
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default RenderText;
