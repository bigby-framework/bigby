import Timer from "./Timer";

export default class AutoDestroy extends Timer {
  awake() {
    super.awake();
    this.onTimeout(() => this.entity.destroy());
  }
}
