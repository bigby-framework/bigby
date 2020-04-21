import _ from "lodash";
import { Behavior, InspectorProperty } from "@bigby/core";
import React, { FC } from "react";
import {
  CheckboxInput,
  Description,
  Inspector,
  NumberInput,
  Property,
  PropertyGroup,
  TextInput,
} from "./inspector";
import styles from "./InspectorView.css";
import { useEditorState } from "./state";
import { Area } from "./ui/Area";
import { getInspectorPropertiesFor } from "@bigby/core";

const DynamicProperty: FC<
  { behavior: Behavior; subLabel?: string } & InspectorProperty
> = ({ behavior, path, label, subLabel, options }) => {
  const type = typeof _.get(behavior, path);
  const input =
    type == "number" ? (
      <NumberInput path={path} {...options} />
    ) : type == "boolean" ? (
      <CheckboxInput path={path} {...options} />
    ) : (
      <TextInput path={path} />
    );

  return <Property {...{ label, subLabel }}>{input}</Property>;
};

const DynamicInspector: FC<{ behavior: Behavior }> = ({ behavior }) => {
  return (
    <Inspector behavior={behavior}>
      <PropertyGroup>
        {getInspectorPropertiesFor(behavior.constructor)?.map(
          (config: InspectorProperty) => {
            if (config.subProperties) {
              return config.subProperties.map((p: string, i: number) => (
                <DynamicProperty
                  key={`${config.path}.${p}`}
                  {...{
                    behavior: behavior,
                    ...config,
                    label: i == 0 ? config.label : null,
                    subLabel: p,
                    path: `${config.path}.${p}`,
                  }}
                />
              ));
            } else {
              return (
                <DynamicProperty
                  key={config.path}
                  {...{ behavior: behavior, ...config }}
                />
              );
            }
          }
        )}
      </PropertyGroup>
    </Inspector>
  );
};

const BehaviorInspector: FC<{ behavior: Behavior }> = ({ behavior }) => {
  const constructor = Object.getPrototypeOf(behavior).constructor;
  const name = constructor.displayName || constructor.name;
  const icon = constructor.icon;
  const description = constructor.description;

  return (
    <div className={styles["behavior-inspector"]}>
      <header>
        {icon && <span>{icon}</span>}
        {name}
      </header>
      <main>
        {description && <Description>{description}</Description>}
        <DynamicInspector behavior={behavior} />
      </main>
    </div>
  );
};

const InspectorView: FC = (props) => {
  const [state] = useEditorState();
  const { selectedEntity } = state;

  return (
    <Area>
      {!selectedEntity ? (
        <>No entity selected.</>
      ) : selectedEntity.behaviors.length === 0 ? (
        <>The selected entity does not contain any behaviors.</>
      ) : (
        selectedEntity.behaviors.map((co) => (
          <BehaviorInspector behavior={co} key={co.id} />
        ))
      )}
    </Area>
  );
};

export { InspectorView };
