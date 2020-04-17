import { Behavior, Entity, inspect, signal } from "@bigby/core";

class SelectedEntity extends Behavior {
  /* selectedObject property */
  private _selectedEntity: Entity;

  get selectedEntity() {
    return this._selectedEntity;
  }

  set selectedEntity(ent: Entity) {
    console.log("Selected entity:", ent);
    this._selectedEntity = ent;
  }

  /* onSelectEntity is fired when the user selects an entity within the editor view. */
  onSelectEntity = signal<Entity>();

  selectEntityFromGameView(ent: Entity) {
    this.selectedEntity = ent;
    this.onSelectEntity.emit(this.selectedEntity);
  }
}

export default SelectedEntity;
