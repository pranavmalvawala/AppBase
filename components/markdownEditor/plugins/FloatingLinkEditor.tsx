import { $getSelection, $isRangeSelection, SELECTION_CHANGE_COMMAND } from "lexical";
import { useRef, useState, useCallback, useEffect, KeyboardEventHandler } from "react";
import { $wrapNodes, $isAtNodeEnd } from "@lexical/selection";
import { $getNearestNodeOfType, mergeRegister } from "@lexical/utils";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "./LexicalLink";
//import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";

const LowPriority = 1;

export function getSelectedNode(selection: any) {
  const anchor = selection.anchor;
  const focus = selection.focus;
  const anchorNode = selection.anchor.getNode();
  const focusNode = selection.focus.getNode();
  if (anchorNode === focusNode) {
    return anchorNode;
  }
  const isBackward = selection.isBackward();
  if (isBackward) {
    return $isAtNodeEnd(focus) ? anchorNode : focusNode;
  } else {
    return $isAtNodeEnd(anchor) ? focusNode : anchorNode;
  }
}

function positionEditorElement(editor: any, rect: any) {
  if (rect === null) {
    editor.style.opacity = "0";
    editor.style.top = "-1000px";
    editor.style.left = "-1000px";
  } else {
    editor.style.opacity = "1";
    editor.style.top = `${rect.top + rect.height + window.pageYOffset + 10}px`;
    editor.style.left = `${rect.left + window.pageXOffset - editor.offsetWidth / 2 + rect.width / 2}px`;
  }
}

export function FloatingLinkEditor({ editor }: { editor: any }) {
  const editorRef = useRef(null);
  const inputRef = useRef(null);
  const mouseDownRef = useRef(false);
  const [linkClass, setLinkClass] = useState("link");
  const [linkUrl, setLinkUrl] = useState("");
  const [isEditMode, setEditMode] = useState(false);
  const [lastSelection, setLastSelection] = useState(null);

  const updateLinkEditor = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const node = getSelectedNode(selection);
      const parent = node.getParent();

      if ($isLinkNode(parent)) {
        setLinkUrl(parent.getURL());
        setLinkClass(parent.getClassName());
      } else if ($isLinkNode(node)) {
        setLinkUrl(node.getURL());
        setLinkClass(node.getClassName());
      } else {
        setLinkUrl("");
        setLinkClass("");
      }
    }
    const editorElem = editorRef.current;
    const nativeSelection = window.getSelection();
    const activeElement = document.activeElement;

    if (editorElem === null) {
      return;
    }

    const rootElement = editor.getRootElement();
    if (
      selection !== null
      && !nativeSelection.isCollapsed
      && rootElement !== null
      && rootElement.contains(nativeSelection.anchorNode)
    ) {
      const domRange = nativeSelection.getRangeAt(0);
      let rect;
      if (nativeSelection.anchorNode === rootElement) {
        let inner = rootElement;
        while (inner.firstElementChild != null) {
          inner = inner.firstElementChild;
        }
        rect = inner.getBoundingClientRect();
      } else {
        rect = domRange.getBoundingClientRect();
      }

      if (!mouseDownRef.current) {
        positionEditorElement(editorElem, rect);
      }
      setLastSelection(selection);
    } else if (!activeElement || activeElement.className !== "link-input") {
      positionEditorElement(editorElem, null);
      setLastSelection(null);
      setEditMode(false);
      setLinkUrl("");
    }

    return true;
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }: { editorState: any }) => { editorState.read(() => { updateLinkEditor(); }); }),
      editor.registerCommand(SELECTION_CHANGE_COMMAND, () => { updateLinkEditor(); return true; }, LowPriority)
    )
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    editor.getEditorState().read(() => {
      updateLinkEditor();
    });
  }, [editor, updateLinkEditor]);

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (lastSelection !== null) {
        if (linkUrl !== "") editor.dispatchCommand(TOGGLE_LINK_COMMAND, linkUrl);
        setEditMode(false);
      }
    } else if (event.key === "Escape") {
      event.preventDefault();
      setEditMode(false);
    }
  }

  //<input ref={inputRef} className="link-input" value={linkUrl} onChange={(event) => { setLinkUrl(event.target.value); }} onKeyDown={handleKeyDown} />

  return (
    <div ref={editorRef} className="link-editor">
      {isEditMode
        ? (
          <div style={{ paddingLeft: 10, paddingRight: 10 }}>

            <TextField size="small" fullWidth type="text" label="Url" name="link-input" value={linkUrl} onChange={(event) => { setLinkUrl(event.target.value); }} onKeyDown={handleKeyDown} />
            <FormControl fullWidth size="small">
              <InputLabel>Appearance</InputLabel>
              <Select label="Appearance" name="link-appearance" value={linkClass} onChange={(e) => { setLinkClass(e.target.value) }}>
                <MenuItem value="link">Link</MenuItem>
                <MenuItem value="button">Button</MenuItem>
              </Select>
            </FormControl>
          </div>)

        : (
          <>
            <div className="link-input">
              <a href={linkUrl} target="_blank" rel="noopener noreferrer">
                {linkUrl}
              </a>
              <div className="link-edit" role="button" tabIndex={0} onMouseDown={(event) => event.preventDefault()} onClick={() => { setEditMode(true); }} />
            </div>
          </>
        )}
    </div>
  );
}