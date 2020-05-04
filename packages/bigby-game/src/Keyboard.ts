import { Behavior } from "@bigby/core";
import hotkeys from "hotkeys-js";

/* We need to set up a single hotkeys event because otherwise, hotkeys-js won't
register its keyboard listeners. */
hotkeys(" ", () => {});

/**
 * Provides an interface to the user's keyboard.
 */
export default class Keyboard extends Behavior {
  get isPressed() {
    return hotkeys.isPressed;
  }
}
