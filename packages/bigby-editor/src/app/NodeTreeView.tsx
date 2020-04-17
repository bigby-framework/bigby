import { Entity } from "@bigby/core";
import React, { FC } from "react";
import SelectedEntity from "../SelectedEntity";
import { useEditorState } from "./state";
import { Tree, TreeItem } from "./ui";
import { Area } from "./ui/Area";
import { useAutomaticRerender } from "./util/useAutomaticRerender";

const EntityTreeItem: FC<{
  entity: Entity;
  onSelectEntity?: Function;
  onDoubleClickEntity?: Function;
}> = ({ entity, onSelectEntity, onDoubleClickEntity }) => {
  const [state] = useEditorState();

  const children =
    entity.children.length > 0
      ? entity.children.map((child) => (
          <EntityTreeItem
            key={child.id}
            entity={child}
            onSelectEntity={onSelectEntity}
            onDoubleClickEntity={onDoubleClickEntity}
          />
        ))
      : null;

  return (
    <TreeItem
      highlighted={entity === state.selectedEntity}
      icon={entity.icon}
      title={entity.name}
      onSelect={onSelectEntity && (() => onSelectEntity(entity))}
      onDoubleClick={onDoubleClickEntity && (() => onDoubleClickEntity(entity))}
      children={children}
    />
  );
};

const NodeTreeView: FC = (props) => {
  /* For the time being, we'll automatically rerender every 200ms. In the long run, we
  probably want to figure out how to do this reactively. */
  useAutomaticRerender(200);

  const [state, dispatch] = useEditorState();
  const { root } = state;

  const handleSelectEntity = (entity: Entity) => {
    dispatch({ type: "selectEntity", entity });
    root.getBehavior(SelectedEntity).selectedEntity = entity;
  };

  const handleDoubleClickEntity = (ent: Entity) => {
    /* TODO: implement zoom to entity */
  };

  return (
    <Area>
      <Tree>
        <EntityTreeItem
          entity={root}
          onSelectEntity={handleSelectEntity}
          onDoubleClickEntity={handleDoubleClickEntity}
        />
      </Tree>
    </Area>
  );
};

export { NodeTreeView };