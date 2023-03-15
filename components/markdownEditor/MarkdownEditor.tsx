import React from "react";
import { Editor } from "./Editor"

interface Props {
  value: string;
  onChange?: (newValue: string) => void;
  style?: any;
  textAlign?: "left" | "center" | "right";
  placeholder?: string;
}

export function MarkdownEditor({ value: markdownString = "", onChange, style, textAlign, placeholder }: Props) {
  return <Editor value={markdownString} onChange={onChange} style={style} textAlign={textAlign} placeholder={placeholder} />;
}
