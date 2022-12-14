'use strict';

const _throttle = (
  fn: (...args: any[]) => any,
  delay = 100,
): (...args: any[]) => void => {
  let wait = false;
  let storedArgs: any[] | null = [];

  const checkStoredArgs = (): void => {
    if (storedArgs) {
      fn(...storedArgs);
      storedArgs = null;
      setTimeout(checkStoredArgs, delay);
    } else {
      wait = false;
    }
  };

  return (...args: any[]): void => {
    if (wait) {
      storedArgs = args;
      return;
    }

    fn(...args);
    wait = true;
    setTimeout(checkStoredArgs, delay);
  };
}