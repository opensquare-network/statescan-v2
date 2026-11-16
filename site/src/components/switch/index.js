import styled from "styled-components";
import noop from "lodash.noop";
import { Flex } from "../styled/flex";
import { Inter_14_500 } from "../../styles/text";

// The theme color is used instead of the inherited one, which stays black in the dark
// theme and would make the text unreadable.
const Label = styled.span`
  color: ${({ theme }) => theme.fontSecondary};
  ${Inter_14_500};
`;

const Track = styled.span`
  position: relative;
  flex: none;
  width: 36px;
  height: 20px;
  border-radius: 10px;
  transition: background 0.2s;
  background: ${({ theme, checked }) =>
    checked ? theme.theme500 : theme.fillSub};
`;

const Knob = styled.span`
  position: absolute;
  top: 2px;
  left: ${({ checked }) => (checked ? 18 : 2)}px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: ${({ theme }) => theme.fillPanel};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  transition: left 0.2s;
`;

export default function Switch({
  checked = false,
  label = "",
  onChange = noop,
}) {
  return (
    <Flex
      gap={8}
      role="switch"
      aria-checked={checked}
      style={{ cursor: "pointer", userSelect: "none" }}
      onClick={() => onChange(!checked)}
    >
      {label && <Label>{label}</Label>}
      <Track checked={checked}>
        <Knob checked={checked} />
      </Track>
    </Flex>
  );
}
