import { useEffect, useState } from "react";

export function useScrollLock(element = document.body) {
  const [isLocked, setIsLocked] = useState(false);

  let initialOverflow;

  function lock() {
    if (element) {
      initialOverflow = element.style.overflow;

      if (isLocked) {
        element.style.overflow = "hidden";
      }
    }
  }

  function unlock() {
    element.style.overflow = initialOverflow;
  }

  useEffect(() => {
    lock();

    return unlock;
  }, [isLocked]);

  return [isLocked, setIsLocked];
}
