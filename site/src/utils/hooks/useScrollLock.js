import { useRef } from "react";
import { useCallback } from "react";
import { useEffect, useState } from "react";

export function useScrollLock(element = document.body) {
  const [isLocked, setIsLocked] = useState(false);
  const initialOverflow = useRef();

  const lock = useCallback(() => {
    if (element) {
      initialOverflow.current = element.style.overflow;

      if (isLocked) {
        element.style.overflow = "hidden";
      }
    }
  }, [isLocked, element]);

  const unlock = useCallback(() => {
    element.style.overflow = initialOverflow.current;
  }, [element]);

  useEffect(() => {
    lock();

    return unlock;
  }, [isLocked, lock, unlock]);

  return [isLocked, setIsLocked];
}
