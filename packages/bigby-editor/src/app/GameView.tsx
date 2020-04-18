import { Game2D } from "@bigby/2d";
import { Renderer3D } from "@bigby/3d";
import React, { FC, useEffect, useRef } from "react";
import SelectedEntity from "../SelectedEntity";
import css from "./GameView.css";
import { useEditorState } from "./state";

const GameView: FC = () => {
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

      /* Move the game to our own little DOM element */

      /* TODO: we don't really want to have these hard dependencies into the 2d
      and 3d packages here. We should find a smarter way to do this. */
      const game2D = root.getBehavior(Game2D);
      if (game2D) game2D.element = ref.current;
      const renderer3D = root.getBehavior(Renderer3D);
      if (renderer3D) renderer3D.element = ref.current;
    }
  }, [ref]);

  return <div className={css.gameView} ref={ref}></div>;
};

export { GameView };
