import { createContext, useContext, Dispatch } from "react";
import { Entity } from "@bigby/core";
import { Game2D } from "@bigby/2d";
import Editor from "../../Editor";

/* This is what our editor state looks like. */
export type EditorState = {
  /* The game we're editing, aka root node */
  root: Entity;

  /* The node that is currently selected in the editor */
  selectedEntity: Entity | null;

  /* Are we currently playing the game, or just editing? */
  isPlaying: boolean;
};

type Action =
  | { type: "selectEntity"; entity: Entity }
  | { type: "startPlaying" }
  | { type: "stopPlaying" }
  | { type: "togglePlaying" };

export const reducer = (state: EditorState, action: Action): EditorState => {
  switch (action.type) {
    case "selectEntity":
      return { ...state, selectedEntity: action.entity };

    case "startPlaying": {
      const editor = state.root.getBehavior(Editor);
      editor.isEditing = false;
      return { ...state, isPlaying: true };
    }

    case "stopPlaying": {
      const editor = state.root.getBehavior(Editor);
      editor.isEditing = true;
      return { ...state, isPlaying: false };
    }

    case "togglePlaying": {
      const editor = state.root.getBehavior(Editor);
      const newPlaying = !state.isPlaying;
      editor.isEditing = !newPlaying;
      return { ...state, isPlaying: newPlaying };
    }
  }
};

/* Define our context */
export const EditorStateContext = createContext<
  [EditorState, Dispatch<Action>]
>(null);

/* Convenience function for using the context */
export const useEditorState = () => useContext(EditorStateContext);
