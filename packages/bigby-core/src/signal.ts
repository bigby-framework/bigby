type SignalHandler<T> = (payload: T) => void;

export const signal = <T = null>() => {
  const handlers: SignalHandler<T>[] = [];

  const signal = (handler: SignalHandler<T>) => {
    signal.add(handler);
  };

  signal.emit = (payload: T = null) => {
    handlers.forEach((h) => h(payload));
  };

  signal.add = (handler: SignalHandler<T>) => {
    handlers.push(handler);
  };

  return signal;
};
