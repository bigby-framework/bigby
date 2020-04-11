import { Entity } from "@bigby/core";
import "normalize.css";
import React, { FC, useReducer } from "react";
import "./Application.css";
import { Editor } from "./Editor";
import { EditorStateContext, reducer } from "./state";

interface IProps {
  root: Entity;
}

const Application: FC<IProps> = ({ root }) => {
  const [state, dispatch] = useReducer(reducer, {
    root,
    selectedEntity: null,
    isPlaying: false,
  });

  return (
    <EditorStateContext.Provider value={[state, dispatch]}>
      <Editor />
    </EditorStateContext.Provider>
  );
};
export { Application };
