import { useEffect, useState } from "react";

function useTimer(initialValue: number = 59, interval: number = 1000) {
  const [timer, setTimer] = useState(initialValue);

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined;
    if (timer > 0) {
      handler = setInterval(() => {
        setTimer(timer - 1);
      }, interval);
    } else {
      if (handler) {
        clearInterval(handler);
      }
    }

    return () => {
      if (handler) {
        clearInterval(handler);
      }
    };
  }, [interval, timer]);

  const reset = () => {
    setTimer(initialValue);
  };
  return { timer, timerDisplay: timer.toString().padStart(2, "0"), reset };
}

export { useTimer };
