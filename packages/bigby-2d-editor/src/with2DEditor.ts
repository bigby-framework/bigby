import { Ticker } from "@bigby/behaviors";
import { Game2D, Renderable2D, UI2D } from "@bigby/2d";
import { Entity } from "@bigby/core";
import EditorGrid2D from "./EditorGrid2D";
import { SelectedEntity, Editor } from "@bigby/editor";
import SelectedEntityGizmo2D from "./SelectedEntityGizmo2D";
import ViewportController2D from "./ViewportController2D";

const with2DEditor = (game: Entity) => {
  const editor = new Entity();
  editor.name = "Editor";
  editor.icon = "🛠";

  /* Remove Game2D from game itself */
  const game2D = game.getBehavior(Game2D);
  game.removeBehavior(game2D);
  editor.addBehavior(game2D);

  /* Remove Also, Ticker from game itself */
  const ticker = game.getBehavior(Ticker);
  game.removeBehavior(ticker);
  editor.addBehavior(ticker);

  editor.addBehavior(Editor, { element: document.getElementById("bigby") });
  editor.addBehavior(Renderable2D);
  editor.addBehavior(UI2D, { editorOnly: true });
  editor.addBehavior(SelectedEntity);
  editor.addBehavior(SelectedEntityGizmo2D);
  editor.addBehavior(ViewportController2D);
  editor.addBehavior(EditorGrid2D);

  editor.addChild(game);

  return editor;
};

export default with2DEditor;
