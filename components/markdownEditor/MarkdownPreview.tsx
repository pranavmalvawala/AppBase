import React from "react";
import { Editor } from "./Editor"

interface Props {
  value: string;
}

export function MarkdownPreview({ value: markdownString = "" }: Props) {
  return <Editor mode="preview" value={markdownString} />;
}
