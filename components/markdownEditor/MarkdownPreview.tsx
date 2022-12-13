import dynamic from "next/dynamic";

interface Props {
  value: string;
}

const Preview = dynamic(() => import("@uiw/react-markdown-preview"), { ssr: false });

export function MarkdownPreview({ value }: Props) {
  return <Preview source={value} style={{ background: "inherit" }} />;
}
