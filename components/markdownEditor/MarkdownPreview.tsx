import React from "react";
import { markdownToDraft } from "markdown-draft-js"
import { convertFromRaw, EditorState } from "draft-js"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  value: string;
  editor: any;
}

export function MarkdownPreview({ value: markdownString, editor: Editor }: Props) {
  const rawData = markdownToDraft(markdownString)
  const contentState = convertFromRaw(rawData)
  const editorState = EditorState.createWithContent(contentState)

  return <Editor readyOnly toolbarHidden={true} editorState={editorState} />;
}
