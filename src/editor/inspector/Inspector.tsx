import _ from "lodash";
import { Behavior } from "../../core/Behavior";
import React, { createContext, FC, useContext, useState } from "react";
import { useAutomaticRerender } from "../util/useAutomaticRerender";
import css from "./Inspector.css";

/* Context */
const BehaviorContext = createContext<Behavior>(null);
const useBehaviorContext = () => useContext(BehaviorContext);

/* Sets the specified property on the given behavior instance. Used by a bunch of inspector
   components for committing the edited value to the behavior. */
const setProperty = <T extends any>(
  behavior: Behavior,
  path: string,
  value: T
) => {
  _.set(behavior, path, value);
  behavior.onPropertyUpdate.emit();
};

/* Base component for inspectors. Doesn't do much besides making the behavior that's being edited
available through a context. */
const Inspector: FC<{ behavior: Behavior }> = ({ behavior, children }) => (
  <BehaviorContext.Provider value={behavior}>
    {children}
  </BehaviorContext.Provider>
);
/* Renders a text description of the behavior. */
const Description: FC = ({ children }) => (
  <div className={css.description}>{children}</div>
);

/* Groups a bunch of properties into a group. */
const PropertyGroup: FC = ({ children }) => (
  <table className={css.propertyGroup}>
    <tbody>{children}</tbody>
  </table>
);

/* Renders an editable property inside an inspectore. */
interface IProperty {
  label: string;
  subLabel?: string;
  description?: string;
}
const Property: FC<IProperty> = ({
  label,
  subLabel,
  children,
  description,
}) => (
  <tr className={css.property} title={description}>
    <th className={css.label}>{label}</th>
    <th className={css.subLabel}>{subLabel}</th>
    <td>{children}</td>
  </tr>
);

/* IInput */
interface IInput {
  path: string;
}

/* Helper hook for text-based property input fields. */
const usePropertyInput = <T extends any>(
  behavior: Behavior,
  path: string,
  castFromInput: (v: any) => T = (v) => v,
  castToInput: (v: T) => any = (v) => v
) => {
  const currentValue = _.get(behavior, path);
  let [value, setValue] = useState<T>(currentValue);
  const [editing, setEditing] = useState(false);

  /* If we're not editing the field right now, use the live value for the form field */
  if (!editing) value = castToInput(currentValue);

  const commit = (value: T) => {
    setProperty(behavior, path, value);
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setValue(currentValue);
    setEditing(true);
    e.target.select();
  };

  const onBlur = () => {
    setEditing(false);
    commit(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      commit(value);
      (e.target as HTMLInputElement).blur();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(castFromInput(e.target.value));
    commit(castFromInput(e.target.value));
  };

  return { onFocus, onBlur, onChange, onKeyDown, value };
};

/* TextInput */
interface ITextInput extends IInput {}
const TextInput: FC<ITextInput> = ({ path }) => {
  useAutomaticRerender(80);
  const behavior = useBehaviorContext();
  const attrs = usePropertyInput<string>(behavior, path);

  return <input type="text" {...attrs} />;
};

/* NumberInput */
interface INumberInput extends IInput {
  step?: number;
  min?: number;
  max?: number;
}
const NumberInput: FC<INumberInput> = ({ path, min, max, step }) => {
  useAutomaticRerender(80);
  const behavior = useBehaviorContext();

  const attrs = usePropertyInput<number>(
    behavior,
    path,
    (v) => parseFloat(v) || 0,
    (v) => +v.toFixed(2)
  );

  return <input type="number" {...attrs} {...{ step, min, max }} />;
};

/* CheckboxInput */
interface ICheckboxInput extends IInput {}
const CheckboxInput: FC<ICheckboxInput> = ({ path }) => {
  useAutomaticRerender(80);
  const behavior = useBehaviorContext();
  const currentValue = _.get(behavior, path);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProperty(behavior, path, !currentValue);
    e.target.blur();
  };

  return (
    <input type="checkbox" onChange={handleChange} checked={currentValue} />
  );
};

export {
  Inspector,
  Description,
  PropertyGroup,
  Property,
  TextInput,
  NumberInput,
  CheckboxInput,
};
