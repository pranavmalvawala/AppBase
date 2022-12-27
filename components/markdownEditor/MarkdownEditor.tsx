import React, { useEffect, useState } from "react";
import { markdownToDraft } from "markdown-draft-js";
import { convertToRaw, EditorState, convertFromRaw } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  editor: any;
}

export function MarkdownEditor({ value: markdownString, onChange, editor: Editor }: Props) {
  const [hasActed, setHasActed] = useState<boolean>(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (markdownString && !hasActed) {
      setHasActed(true)
      const rawData = markdownToDraft(markdownString);
      const contentState = convertFromRaw(rawData);
      const editorState = EditorState.createWithContent(contentState);
      setEditorState(editorState)
    }
  }, [markdownString]);

  const handleChange = (editorState: any) => {
    setEditorState(editorState)
    if (editorState?.getCurrentContent) {
      const content = editorState.getCurrentContent();
      const rawObject = convertToRaw(content);
      const markdownString = draftToMarkdown(rawObject);
      onChange(markdownString);
    }
  };

  return <Editor onEditorStateChange={handleChange} editorState={editorState} />;
}
