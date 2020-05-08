import { Behavior } from "@bigby/core";
import hotkeys from "hotkeys-js";

/* We need to set up a single hotkeys event because otherwise, hotkeys-js won't
register its keyboard listeners. */
// eslint-disable-next-line @typescript-eslint/no-empty-function
hotkeys(" ", () => {});

/**
 * Provides an interface to the user's keyboard.
 */
export default class Keyboard extends Behavior {
  /**
   * Returns true if the specified key is currently being pressed. This behavior
   * uses `hotkeys-js` under the hood, so you can use any key codes supported by
   * it. (See its [documentation](https://github.com/jaywcjlove/hotkeys) for
   * details.)
   *
   * @readonly
   * @memberof Keyboard
   */
  get isPressed() {
    return hotkeys.isPressed;
  }
}
