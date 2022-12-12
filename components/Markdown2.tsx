import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeAttrs from "rehype-attr";
import rehypeRaw from "rehype-raw";
import React from "react";

interface Props {
  value: string;
}

export function Markdown({ value }: Props) {
  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw, [rehypeAttrs, { properties: "attr" }]]} remarkPlugins={[remarkGfm]}>
      {value}
    </ReactMarkdown>
  );
}
