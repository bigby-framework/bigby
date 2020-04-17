import { Game2D } from "@bigby/2d";
import React, { FC, useEffect, useRef } from "react";
import SelectedEntity from "../SelectedEntity";
import css from "./GameView.css";
import { useEditorState } from "./state";

const GameView: FC = (props) => {
  const [state, dispatch] = useEditorState();
  const { root } = state;
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      /* Disable right-click menu on our game view */
      (ref.current as HTMLDivElement).oncontextmenu = () => false;

      /* React to selection of entities from within game view */
      {
        const se = root.getBehavior(SelectedEntity);
        se.onSelectEntity((entity) => {
          dispatch({ type: "selectEntity", entity });
        });
      }

      /* Start the game */
      const game2D = root.getBehavior(Game2D);
      game2D.element = ref.current;
      root.awake();
    }
  }, [ref]);

  return <div className={css.gameView} ref={ref}></div>;
};

export { GameView };
