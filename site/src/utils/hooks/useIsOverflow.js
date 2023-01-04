import { useEffect, useState } from "react";

function checkIsOverflow(element) {
  return element.offsetWidth < element.scrollWidth;
}

export default function useIsOverflow(ref) {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setIsOverflow(checkIsOverflow(ref.current));
  }, [ref]);

  return isOverflow;
}
