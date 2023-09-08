import { Flex } from "../styled/flex";
import { ReactComponent as CheckboxOnIcon } from "../icons/checkbox-on.svg";
import { ReactComponent as CheckboxOffIcon } from "../icons/checkbox-off.svg";
import noop from "lodash.noop";
import { useEffect, useState } from "react";

export default function Checkbox({
  defaultChecked = false,
  label = "",
  onCheckedChange = noop,
}) {
  const [checked, setChecked] = useState(defaultChecked);

  useEffect(() => {
    onCheckedChange(checked);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <Flex
      gap={8}
      style={{ cursor: "pointer", userSelect: "none" }}
      onClick={() => {
        setChecked(!checked);
      }}
    >
      {checked ? <CheckboxOnIcon /> : <CheckboxOffIcon />}
      {label}
    </Flex>
  );
}
