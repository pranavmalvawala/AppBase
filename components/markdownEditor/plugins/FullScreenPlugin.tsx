import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { PLAYGROUND_TRANSFORMERS } from "./MarkdownTransformers";
import { $convertFromMarkdownString } from "@lexical/markdown";

interface Props {
  value: string;
}

// When isDisabled true, set active editor in ReadOnly mode preventing changes
export function FullScreenPlugin(props: Props): any {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(props.value, PLAYGROUND_TRANSFORMERS);
    });
  }, [editor, props.value]);

  return null;
}

