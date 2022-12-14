import React from "react"
import { Box } from "@mui/material";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  editor: any;
}

export function MarkdownEditor({ value, onChange, editor: MDEditor }: Props) {
  return (
    <Box sx={{ border: "1px solid currentColor", borderRadius: 2 }}>
      <MDEditor value={value} onChange={onChange} preview="edit" />
    </Box>
  );
}
