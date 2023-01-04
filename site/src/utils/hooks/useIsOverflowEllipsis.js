import { useEffect, useState } from "react";

function isEllipsisActive(element) {
  return element.offsetWidth < element.scrollWidth;
}

export default function useIsOverflowEllipsis(ref) {
  const [isEllipsis, setIsEllipsis] = useState(false);

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    setIsEllipsis(isEllipsisActive(ref.current));
  }, [ref]);

  return isEllipsis;
}
