import React, { FC, useEffect } from "react";
import { useEditorState } from "./state";
import { Game2D } from "@bigby/2d";

import hotkeys from "hotkeys-js";

const KeyboardShortcut: FC<{ shortcut: string; onPressed: () => void }> = ({
  shortcut,
  onPressed,
}) => {
  useEffect(() => {
    hotkeys(shortcut, onPressed);
  }, [shortcut]);

  return null;
};

const KeyboardShortcuts: FC = () => {
  const [state, dispatch] = useEditorState();

  const togglePlayPause = () => dispatch({ type: "togglePlaying" });

  return (
    <>
      <KeyboardShortcut shortcut="shift+space" onPressed={togglePlayPause} />
    </>
  );
};

export { KeyboardShortcuts };
