import { capitalCase } from "change-case";
import { Behavior } from "./Behavior";

export type InspectorProperty = {
  path: string;
  label: string;
  subProperties?: string[];
  options?: { [key: string]: any };
};

let inspectorProperties = new Array<
  { constructor: Function } & InspectorProperty
>();

/* Returns a list of inspector properties for the specified constructor. */
export const getInspectorPropertiesFor = (constructor: Function) =>
  inspectorProperties.filter((ip) => ip.constructor === constructor);

/* Decorates an object property/accessor as an inspector property. */
export const inspect = (
  label?: string,
  subProperties?: string[],
  options?: { [key: string]: any }
) => {
  return (behavior: Behavior, path: string) => {
    /* Add property to list */
    inspectorProperties.push({
      constructor: behavior.constructor,
      label: label || capitalCase(path),
      path,
      subProperties,
      options,
    });
  };
};
