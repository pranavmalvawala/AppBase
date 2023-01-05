import { AutoLinkPlugin } from "@lexical/react/LexicalAutoLinkPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import React, { useEffect } from "react";

const LINK_MATCHER = /(\[[^\]]])\([^\s)]*\)({\.[^\s}]*})/;

const getParts = (text: string) => {
  const textRegex = /(\[[^\]]])/;
  const urlRegex = /\([^\s)]*\)/;
  const classRegex = /{\.[^\s}]*}/
  let result = { url: "", text: "", className: "" }
  result.text = textRegex.exec(text)[0].replace("[", "").replace("]", "")
  result.url = urlRegex.exec(text)[0].replace("(", "").replace(")", "")
  result.className = classRegex.exec(text)[0].replace("{", "").replace("}", "")
}

const MATCHERS = [
  (text: any) => {
    const match = LINK_MATCHER.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0]
      }
    );
  },

];

interface Props {
  value: string;
}


export function StyledLinkPlugin(props: Props): any {
  const [editor] = useLexicalComposerContext();
  /*

  useEffect(() => {
    editor.update(() => {
      $convertFromMarkdownString(props.value, PLAYGROUND_TRANSFORMERS);
    });
  }, [editor, props.value]);
*/
  return null;
}
