import React, { useRef } from "react";
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
import { ToolbarPlugin, CustomAutoLinkPlugin, ListMaxIndentLevelPlugin, PLAYGROUND_TRANSFORMERS, ReadOnlyPlugin, ControlledEditorPlugin } from "./plugins";
import { MarkdownModal } from "./MarkdownModal";
import { FullScreenPlugin } from "./plugins/FullScreenPlugin";

interface Props {
  value: string;
  onChange?: (value: string) => void;
  mode?: "interactive" | "preview";
}

export function Editor({ value, onChange = () => { }, mode = "interactive" }: Props) {
  const editorStateRef: any = useRef();
  const [fullScreen, setFullScreen] = React.useState(false);

  const handleChange = (editorState: any) => {
    editorStateRef.current = editorState;
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

  const handleCloseFullScreen = (newValue: string) => {
    if (editorStateRef?.current) {
      console.log("Made it?")
      console.log(editorStateRef.current)

      /*
      editorStateRef.current.update(() => {
        const json = $convertFromMarkdownString(value, PLAYGROUND_TRANSFORMERS);
        console.log(json);
      })*/

      //const es = editorStateRef.current.parseEditorState(json)
      //editorStateRef.current.setEditorState(es);
    }
    onChange(newValue)
    setFullScreen(false);
  }

  const getFullScreenModal = () => {
    if (fullScreen) return (<MarkdownModal value={value} hideModal={handleCloseFullScreen} />);
  }

  return (
    <>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container" style={{ border: mode === "preview" ? "none" : "1px solid lightgray" }}>
          {mode !== "preview" && <ToolbarPlugin goFullScreen={() => { setFullScreen(true) }} />}
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
            <FullScreenPlugin editorState={editorStateRef.current} value={value} />
          </div>
        </div>
      </LexicalComposer>
      {getFullScreenModal()}
    </>
  );
}
