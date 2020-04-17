import { Entity } from "@bigby/core";
import {
  Game2D,
  Renderable2D,
  EditorGrid2D,
  ViewportController2D,
  UI2D,
  SelectedEntityController2D,
} from "@bigby/2d";

export const with2DEditor = (game: Entity) => {
  const editor = new Entity();
  editor.name = "Editor";
  editor.icon = "🛠";

  editor.addBehavior(Renderable2D);
  editor.addBehavior(Game2D).set({ isEditing: true });
  editor.addBehavior(UI2D).set({ editorOnly: true });
  editor.addBehavior(SelectedEntityController2D);
  editor.addBehavior(ViewportController2D);
  editor.addBehavior(EditorGrid2D);

  /* Remove Game2D from game itself */
  const game2D = game.getBehavior(Game2D);
  if (game2D) game.removeBehavior(game2D);

  editor.addChild(game);

  return editor;
};

export const with3DEditor = (game: Entity) => {
  return game;
};
