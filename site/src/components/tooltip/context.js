import Context, { useState } from "react";
import Tip from "./tip";

const TooltipContext = Context.createContext();

export default TooltipContext;

export function TooltipProvider({ children }) {
  const [tipContent, setTipContent] = useState();
  const [showTip, setShowTip] = useState(false);
  const [tipPosition, setTipPosition] = useState({ left: 0, top: 0 });

  return (
    <TooltipContext.Provider
      value={{
        setTipContent,
        setShowTip,
        setTipPosition,
      }}
    >
      {children}
      <Tip show={showTip} position={tipPosition}>
        {tipContent}
      </Tip>
    </TooltipContext.Provider>
  );
}

export function useSetShowTip() {
  const { setShowTip } = Context.useContext(TooltipContext);
  return setShowTip;
}

export function useSetTipContent() {
  const { setTipContent } = Context.useContext(TooltipContext);
  return setTipContent;
}

export function useSetTipPosition() {
  const { setTipPosition } = Context.useContext(TooltipContext);
  return setTipPosition;
}
