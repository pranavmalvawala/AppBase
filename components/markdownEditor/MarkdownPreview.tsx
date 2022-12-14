import React from "react"

interface Props {
  value: string;
  editor: any;
}

export function MarkdownPreview({ value, editor: Preview }: Props) {
  return <Preview source={value} style={{ background: "inherit" }} />;
}
