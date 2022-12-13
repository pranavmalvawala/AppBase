import dynamic from "next/dynamic";
import { Box } from "@mui/material";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface Props {
  value: string;
  onChange: (newValue: string) => void;
}

export function MarkdownEditor({ value, onChange }: Props) {
  return (
    <Box sx={{ border: "1px solid currentColor", borderRadius: 2 }}>
      <MDEditor value={value} onChange={onChange} preview="edit" />
    </Box>
  );
}
