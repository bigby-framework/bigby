import React, { FC } from "react";
import { InspectorView } from "./InspectorView";
import { NodeTreeView } from "./NodeTreeView";
import { Pane, HorizontalPanes, VerticalPanes } from "./ui";
import { GamePane } from "./GamePane";
import { KeyboardShortcuts } from "./KeyboardShortcuts";
import { WelcomePane } from "./WelcomePane";

const Editor: FC = () => {
  return (
    <HorizontalPanes>
      <Pane title="Entities" flex="0 0 300px">
        <NodeTreeView />
      </Pane>
      <VerticalPanes>
        <GamePane />
        <WelcomePane />
      </VerticalPanes>
      <Pane title="Behavior Inspector" flex="0 0 350px">
        <InspectorView />
      </Pane>
      <KeyboardShortcuts />
    </HorizontalPanes>
  );
};

export { Editor };
