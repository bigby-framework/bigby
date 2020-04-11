import { useEffect, useState } from "react";

export const useAutomaticRerender = (ms: number) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, ms);
    return () => clearInterval(interval);
  }, []);
};
