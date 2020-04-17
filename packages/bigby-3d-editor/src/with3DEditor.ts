import { Game3D, Transform3D } from "@bigby/3d";
import { Entity } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";
import { SelectedEntity, Editor } from "@bigby/editor";

const with3DEditor = (game: Entity) => {
  const editor = new Entity();
  editor.name = "Editor";
  editor.icon = "🛠";

  editor.addBehavior(Editor, { element: document.getElementById("bigby") });
  editor.addBehavior(SelectedEntity);

  /* Move Game3D */
  const game3D = game.getBehavior(Game3D);
  game.removeBehavior(game3D);
  editor.addBehavior(game3D);

  /* Move Ticker */
  const ticker = game.getBehavior(Ticker);
  game.removeBehavior(ticker);
  editor.addBehavior(ticker);

  editor.addBehavior(Transform3D);

  editor.addChild(game);

  return editor;
};

export default with3DEditor;
