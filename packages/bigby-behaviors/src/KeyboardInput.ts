import { Behavior } from "@bigby/core";
import hotkeys from "hotkeys-js";

/* hotkeys-js needs a "dummy" keyboard event handler in order to properly
initialize. */
hotkeys(" ", () => {});

/**
 * KeyboardInput is a simple behavior that lets other behaviors check
 * for keyboard input.
 */
class KeyboardInput extends Behavior {
  /**
   * Returns true if the specified key is currently being pressed.
   *
   * @param key Key to check.
   */
  isPressed(key: string) {
    return hotkeys.isPressed(key);
  }
}

export default KeyboardInput;
