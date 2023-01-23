import React from "react";
import { Editor } from "./Editor"

interface Props {
  value: string;
  onChange?: (newValue: string) => void;
  style?: any
}

export function MarkdownEditor({ value: markdownString = "", onChange, style }: Props) {
  return <Editor value={markdownString} onChange={onChange} style={style} />;
}
