import Timer from "./Timer";

/**
 * A utility behavior that destroys its assigned entity after a given time
 * (specified in `duration`.)
 *
 * @export
 * @class AutoDestroy
 * @extends {Timer}
 */
export default class AutoDestroy extends Timer {
  awake() {
    super.awake();
    this.onTimeout(() => this.entity.destroy());
  }
}
