import { Box } from "@mui/material";
import {
  bold,
  italic,
  strikethrough,
  hr,
  title,
  divider,
  link,
  quote,
  unorderedListCommand,
  orderedListCommand,
  checkedListCommand,
} from "@uiw/react-md-editor/lib/commands";
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
      <MDEditor
        value={value}
        onChange={onChange}
        commands={[
          bold,
          italic,
          strikethrough,
          hr,
          title,
          divider,
          link,
          quote,
          divider,
          unorderedListCommand,
          orderedListCommand,
          checkedListCommand,
        ]}
        preview="edit"
      />
    </Box>
  );
}
