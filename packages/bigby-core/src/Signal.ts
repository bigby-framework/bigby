/** @internal */
type SignalHandler<T> = (payload: T) => void;

const Signal = <T = undefined>() => {
  const handlers: SignalHandler<T>[] = [];

  const signal = (handler: SignalHandler<T>) => {
    signal.add(handler);
  };

  signal.emit = (payload: T) => {
    handlers.forEach((h) => h(payload));
  };

  signal.add = (handler: SignalHandler<T>) => {
    handlers.push(handler);
  };

  return signal;
};

export default Signal;
