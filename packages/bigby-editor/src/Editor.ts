import { Behavior, inspect, Entity, signal } from "@bigby/core";
import { Ticker } from "@bigby/behaviors";

/** Implements the Bigby editor. Nice! */
class Editor extends Behavior {
  /* Edit Mode Toggle */
  @inspect("Edit Mode") isEditing = true;

  /* Currently selected entity */
  private _selectedEntity: Entity;
  get selectedEntity() {
    return this._selectedEntity;
  }
  set selectedEntity(ent: Entity) {
    this._selectedEntity = ent;
  }

  /* onSelectEntity is fired when the user selects an entity within the editor view. */
  onSelectEntity = signal<Entity>();
}

export default Editor;
