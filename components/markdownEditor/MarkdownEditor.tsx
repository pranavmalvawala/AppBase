import React from "react";
import { Editor } from "./Editor"

interface Props {
  value: string;
  onChange?: (newValue: string) => void;
}

export function MarkdownEditor({ value: markdownString = "", onChange }: Props) {
  return <Editor value={markdownString} onChange={onChange} />;
}
