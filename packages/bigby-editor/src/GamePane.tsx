import React, { FC, useState } from "react";
import { Pane } from "./ui";
import { GameView } from "./GameView";
import { useEditorState } from "./state";

const GamePane: FC = (props) => {
  const [state, dispatch] = useEditorState();

  const handleClick = () => {
    if (state.isPlaying) {
      dispatch({ type: "stopPlaying" });
    } else {
      dispatch({ type: "startPlaying" });
    }
  };

  const icons = (
    <a href="#" onClick={handleClick}>
      {state.isPlaying ? "stop" : "play"}
    </a>
  );

  return (
    <Pane title="Game" flex="1" icons={icons}>
      <GameView />
    </Pane>
  );
};

export { GamePane };
