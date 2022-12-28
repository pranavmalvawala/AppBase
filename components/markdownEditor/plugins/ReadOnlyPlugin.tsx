import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

// When isDisabled truthy, set active editor in ReadOnly mode preventing changes
export function ReadOnlyPlugin({
  isDisabled = false
}: {
  isDisabled?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!isDisabled);
  }, [editor, isDisabled]);

  return null;
}
