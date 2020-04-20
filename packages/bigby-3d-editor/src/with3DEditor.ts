import { Transform3D, Renderer3D } from "@bigby/3d";
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
  const renderer3D = game.getBehavior(Renderer3D);
  game.removeBehavior(renderer3D);
  editor.addBehavior(renderer3D);

  /* Move Ticker */
  const ticker = game.getBehavior(Ticker);
  game.removeBehavior(ticker);
  editor.addBehavior(ticker);

  editor.addBehavior(Transform3D);

  editor.addChild(game);

  return editor;
};

export default with3DEditor;
