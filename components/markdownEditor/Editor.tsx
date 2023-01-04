import React from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS, $convertToMarkdownString, $convertFromMarkdownString } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { ListItemNode, ListNode } from "@lexical/list";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { theme } from "./theme";
import {
  ToolbarPlugin,
  CustomAutoLinkPlugin,
  ListMaxIndentLevelPlugin,
  PLAYGROUND_TRANSFORMERS,
  ReadOnlyPlugin,
  ControlledEditorPlugin
} from "./plugins";


interface Props {
  value: string;
  onChange?: (value: string) => void;
  mode?: "interactive" | "preview";
}

export function Editor({ value, onChange = () => { }, mode = "interactive" }: Props) {
  const handleChange = (editorState: any) => {
    editorState.read(() => {
      const markdown = $convertToMarkdownString(PLAYGROUND_TRANSFORMERS);
      onChange(markdown)
    });
  };

  const onError = (error: any) => {
    console.error(error);
  };

  const initialConfig = {
    editorState: () => $convertFromMarkdownString(value, PLAYGROUND_TRANSFORMERS),
    namespace: "editor",
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode
    ]
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container" style={{ border: mode === "preview" ? "none" : "1px solid lightgray" }}>
        {mode !== "preview" && <ToolbarPlugin />}
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" style={{ minHeight: mode === "preview" ? "auto" : "150px" }} />}
            placeholder={mode !== "preview" ? <div className="editor-placeholder">Enter some text...</div> : null}
            ErrorBoundary={LexicalErrorBoundary}

          />
          <OnChangePlugin onChange={handleChange} />
          <AutoFocusPlugin />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          <CustomAutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <ReadOnlyPlugin isDisabled={mode === "preview"} />
          <ControlledEditorPlugin value={value} isPreview={mode === "preview"} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        </div>
      </div>
    </LexicalComposer>
  );
}
