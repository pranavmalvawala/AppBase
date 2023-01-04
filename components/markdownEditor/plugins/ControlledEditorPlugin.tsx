import { useState, useEffect } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { TRANSFORMERS, $convertFromMarkdownString } from "@lexical/markdown";

interface Props {
  value: string
  isPreview?: boolean;
}

export function ControlledEditorPlugin({ value, isPreview = false }: Props): any {
  const [editor] = useLexicalComposerContext();
  const [hasInit, setHasInit] = useState<boolean>(false);

  useEffect(() => {
    if (!hasInit || isPreview) {
      setHasInit(true)
      editor.update(() => {
        $convertFromMarkdownString(value, TRANSFORMERS);
      })
    }
  }, [value]) //eslint-disable-line

  return null;
}
